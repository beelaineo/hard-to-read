import sanityClient from 'part:@sanity/base/client'
import { path } from 'ramda'

export const niceDate = (sourceDate) => {
  const date =
    typeof sourceDate === 'string' ? new Date(sourceDate) : sourceDate
  return date.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export const getTypeText = (doc) => {
  if (!doc) return ''
  if (doc._type === 'event') return 'Event'
  if (doc._type === 'home') return 'Homepage'
  if (doc._type === 'partner') return 'Partner'
  if (doc._type === 'person') return 'Person'
  if (doc._type === 'place') return 'Place'
  if (doc._type === 'post') return 'Post'
  if (doc._type === 'press') return 'Press'
  if (doc._type === 'theme') return 'Theme'
  return 'Page'
}

const client = sanityClient.withConfig({ apiVersion: '2022-07-19' })

export const getReferencedDocument = async (ref) => client.getDocument(ref)

export const blocksToPlainText = (blocks, lineBreaks = false) =>
  blocks
    ? blocks
        .map((b) =>
          b._type !== 'block' || !b.children
            ? ''
            : b.children.map((child) => child.text).join(''),
        )
        .join(lineBreaks ? '\n\n' : ' ')
    : undefined

export const getImageThumbnail = async (image) => {
  if (!image) return undefined
  const doc = await getReferencedDocument(image.asset._ref)
  return `${doc.url}?w=100&fit=max`
}