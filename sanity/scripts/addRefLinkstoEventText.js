/* eslint-disable no-console */
import sanityClient from 'part:@sanity/base/client'
import { nanoid } from 'nanoid'

const client = sanityClient.withConfig({apiVersion: '2022-05-09'})

// length(text)) returns null if text isn't a (Portable Text) array
const fetchDocuments = () =>
  client.fetch(`*[_type == 'event' && _id == 'imported-allusions'][0...100]
  {
    _id,
    title,
    _rev,
    text,
    "persons": *[_type == 'person'][pt::text(^.text) match name]{ _id, name, _rev },
    "place": *[_type == 'place'][pt::text(^.text) match name]{ _id, name, _rev }, 
  }`)

  // "text": [
  //   {
  //     "_key": "kP_ehy7TAYiJ",
  //     "_type": "block",
  //     "children": [
  //       {
  //         "_key": "JrdIHIwO-9WA",
  //         "_type": "span",
  //         "marks": [],
  //         "text": "ALLUSIONS, co-presented with artist "
  //       },
  //       {
  //         "_key": "a854283ca055",
  //         "_type": "span",
  //         "marks": [
  //           "cc23f429229a"
  //         ],
  //         "text": "Jonas Wendelin"
  //       },
  //       {
  //         "_key": "9dddcb3ab9e7",
  //         "_type": "span",
  //         "marks": [],
  //         "text": ", brought together a collection of readers from the newspaper THE ALLUSION that Wendelin created as part of their show at ONLY at "
  //       },
  //       {
  //         "_key": "e92f1b11ff6e",
  //         "_type": "span",
  //         "marks": [
  //           "16a48f51e348"
  //         ],
  //         "text": "Dittrich & Schlechtriem"
  //       },
  //       {
  //         "_key": "1088db1b24b2",
  //         "_type": "span",
  //         "marks": [],
  //         "text": " gallery in Berlin, Germany. Readers included "
  //       },
  //       {
  //         "_key": "643d296337af",
  //         "_type": "span",
  //         "marks": [
  //           "106e5a856a43"
  //         ],
  //         "text": "Analisa Teachworth"
  //       },
  //       {
  //         "_key": "b12e2037c6e7",
  //         "_type": "span",
  //         "marks": [],
  //         "text": ", "
  //       },
  //       {
  //         "_key": "735c88a02f80",
  //         "_type": "span",
  //         "marks": [
  //           "dec27fcc9dd6"
  //         ],
  //         "text": "Hayden Dunham"
  //       },
  //       {
  //         "_key": "2f58407d4606",
  //         "_type": "span",
  //         "marks": [],
  //         "text": ", "
  //       },
  //       {
  //         "_key": "60db67fde794",
  //         "_type": "span",
  //         "marks": [
  //           "6e217b64a922"
  //         ],
  //         "text": "Fiona Alison Duncan"
  //       },
  //       {
  //         "_key": "7875bbb41ba5",
  //         "_type": "span",
  //         "marks": [],
  //         "text": ", and "
  //       },
  //       {
  //         "_key": "cf0f3927965d",
  //         "_type": "span",
  //         "marks": [
  //           "ce1bcf4dc6ec"
  //         ],
  //         "text": "Milos Trakilovic"
  //       },
  //       {
  //         "_key": "8f28c51278c6",
  //         "_type": "span",
  //         "marks": [],
  //         "text": ", with "
  //       },
  //       {
  //         "_key": "70d5d7c57d8e",
  //         "_type": "span",
  //         "marks": [
  //           "d58280526d18"
  //         ],
  //         "text": "Chase Bell"
  //       },
  //       {
  //         "_key": "e1cc5b41dac4",
  //         "_type": "span",
  //         "marks": [],
  //         "text": " lending their voice and giving context. "
  //       }
  //     ],
  //     "markDefs": [
  //       {
  //         "_key": "cc23f429229a",
  //         "_type": "internalLink",
  //         "reference": {
  //           "_ref": "954426e7-ddeb-4dd9-9e84-6ca3b9be9c38",
  //           "_type": "reference"
  //         }
  //       },
  //       {
  //         "_key": "16a48f51e348",
  //         "_type": "internalLink",
  //         "reference": {
  //           "_ref": "27bdc1a6-e06e-4657-b10f-9c07282a2a6d",
  //           "_type": "reference"
  //         }
  //       },
  //       {
  //         "_key": "106e5a856a43",
  //         "_type": "internalLink",
  //         "reference": {
  //           "_ref": "aa53fbcc-0a9c-4fcc-af2b-bf76b5bbd533",
  //           "_type": "reference"
  //         }
  //       },
  //       {
  //         "_key": "dec27fcc9dd6",
  //         "_type": "internalLink",
  //         "reference": {
  //           "_ref": "a47f8326-2a0f-416d-8caf-e13da8d38907",
  //           "_type": "reference"
  //         }
  //       },
  //       {
  //         "_key": "6e217b64a922",
  //         "_type": "internalLink",
  //         "reference": {
  //           "_ref": "ff084e86-5360-479b-8f28-650fe6848b79",
  //           "_type": "reference"
  //         }
  //       },
  //       {
  //         "_key": "ce1bcf4dc6ec",
  //         "_type": "internalLink",
  //         "reference": {
  //           "_ref": "c76a0a7a-9986-4f29-9325-5cf0c5ff47b7",
  //           "_type": "reference"
  //         }
  //       },
  //       {
  //         "_key": "d58280526d18",
  //         "_type": "internalLink",
  //         "reference": {
  //           "_ref": "7c3b0052-fa24-4488-a1d1-2c761f34fe8a",
  //           "_type": "reference"
  //         }
  //       }
  //     ],
  //     "style": "normal"
  //   }
  // ],

const parseText = (text) => {
  let blocks = []
  let markDefsArray = []
  // blocks.map(block => array.push(
  //   {
  //     "style": "normal",
  //     "_type": "block",
  //     "_key": nanoid(12),
  //     "children": [
  //       {
  //         "_type": "span",
  //         "_key": nanoid(12),
  //         "marks": [],
  //         "text": block
  //       }
  //     ],
  //     markDefs: []
  //   }
  // ))
  return blocks
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

// migrateNextBatch().catch(err => {
//   console.error(err)
//   process.exit(1)
// })
const getDocuments = async () => {
  const documents = await fetchDocuments()
  const persons = documents[0].persons
  const places = documents[0].place
  const text = documents[0].text
  // {
  // _type: "block",
  // "children": [
  //  {
  //   "_key": "9dddcb3ab9e7",
  //   "_type": "span",
  //   "marks": [],
  //   "text": ", brought together a collection of readers from the newspaper THE ALLUSION that Wendelin created as part of their show at ONLY at "
  //  },
  // ],
  // "markDefs": [
  //  {
  //    "_key": "cc23f429229a",
  //    "_type": "internalLink",
  //    "reference": {
  //      "_ref": "954426e7-ddeb-4dd9-9e84-6ca3b9be9c38",
  //      "_type": "reference"
  //    }
  //  },
  // ]
  // }

  const annotateBlock = (block) => {
    let annotatedBlock = block
    console.log(block)
    const personsByName = persons.map(p => p.name)
    personsByName.push('ALLUSION')
    console.log('personsByName', personsByName)
    const placesByName = places.map(p => p.name)
    
    for (const span of block.children) {
      const matchedPersons = persons.filter(p => span.text.includes(p.name))
      console.log('matchedPersons', matchedPersons)
    }

    
    // if block.children.some(span => span.text.incluees)
    // block.children.filter(span => span.text.includes(span.value));
    return annotatedBlock
  }

  const annotateText = (text) => {
    return text.map((block) => annotateBlock(block))
  }

  const annotatedText = annotateText(text)
  
  console.log('annotatedText:', annotatedText)
  
}

getDocuments()