/* eslint-disable no-console */
import sanityClient from 'part:@sanity/base/client'
import { nanoid } from 'nanoid'

const client = sanityClient.withConfig({apiVersion: '2022-03-24'})

// length(text)) returns null if text isn't a (Portable Text) array
const fetchDocuments = () =>
  client.fetch(`*[_type == 'event'][0...100]
  {
    _id,
    title,
    _rev,
    text,
    "people": *[_type == 'person'][pt::text(^.text) match name]{ _id, name, _rev },
  }
  `)

const parsePeople = (people) => {
  if (Array.isArray(people) && people.length > 0) {
  let persons = []
  people.map(p => persons.push(
    {
      "_key": nanoid(12),
      "_ref": p._id,
      "_type": "reference"
    }
  ))
  return persons
  } else {
    return []
  }
}

const buildPatches = docs =>
  docs.map(doc => ({
    id: doc._id,
    patch: {
      set: {persons: parsePeople(doc.people)},
      // this will cause the migration to fail if any of the documents has been
      // modified since it was fetched.
      ifRevisionID: doc._rev
    }
  }))

const createTransaction = patches =>
  patches.reduce((tx, patch) => tx.patch(patch.id, patch.patch), client.transaction())

const commitTransaction = tx => tx.commit()

const migrateNextBatch = async () => {
  const documents = await fetchDocuments()
  const patches = buildPatches(documents)
  if (patches.length === 0) {
    console.log('No more documents to migrate!')
    return null
  }
  console.log(
    `Migrating batch:\n %s`,
    patches.map(patch => `${patch.id} => ${JSON.stringify(patch.patch)}`).join('\n')
  )
  const transaction = createTransaction(patches)
  await commitTransaction(transaction)
  return migrateNextBatch()
}

migrateNextBatch().catch(err => {
  console.error(err)
  process.exit(1)
})

// const logDocuments = async () => {
//   const documents = await fetchDocuments()
//   console.log(documents[4].people)
// }
  

// logDocuments()