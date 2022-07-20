/* eslint-disable no-console */
import sanityClient from 'part:@sanity/base/client'
import { nanoid } from 'nanoid'

const client = sanityClient.withConfig({apiVersion: '2022-03-24'})

// length(text)) returns null if text isn't a (Portable Text) array
const fetchDocuments = () =>
  client.fetch(`*[_type == 'event' && _id != 'imported-a-tease-thats-a-bond'][0...100] {_id, _rev, text}`)

const parseText = (text) => {
  if (typeof text == 'string') {
  const blocks = text.split(/\r?\n/)
  let array = []
  blocks.map(block => array.push(
    {
      "style": "normal",
      "_type": "block",
      "_key": nanoid(12),
      "children": [
        {
          "_type": "span",
          "_key": nanoid(12),
          "marks": [],
          "text": block
        }
      ],
      markDefs: []
    }
  ))
  return array
  } else {
    return text
  }
}

const buildPatches = docs =>
  docs.map(doc => ({
    id: doc._id,
    patch: {
      set: {text: parseText(doc.text)},
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
