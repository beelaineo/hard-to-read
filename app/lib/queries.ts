const postFields = `
  _id,
  _createdAt,
  _updatedAt,
  publishedAt,
  title,
  body,
  themes,
  "slug": slug.current,
`
const relatedDocs = `*[_type != 'home' && references(^._id)]{ title, _type, _id, slug }`

export const siteQuery = `*[_id == "siteSettings"][0] {
  ...
}
`

export const indexQuery = `
*[_id == "home"] {
  ...,
  content[] {
    _type == 'eventRef' => @->{
      ..., 
      _id, 
      '_key': ^._key,
      images[] {
        _key,
        _type,
        asset->
      },
      persons[] {
        _key,
        'person': @->
      },
      place->,
      themes[] {
        _key,
        'theme': @->
      },
    },
    _type == 'personRef' => @->{
      ...,
      _id,
      '_key': ^._key,
      'related': ${relatedDocs}
    },
    _type == 'placeRef' => @->{
      ...,
      _id,
      '_key': ^._key,
      'related': ${relatedDocs}
    },
    _type == 'postRef' => @->{
      ...,
      _id,
      '_key': ^._key,
      themes[]->
    },
    _type == 'themeRef' => @->{
      ...,
      _id,
      '_key': ^._key,
      'related': ${relatedDocs}
    },
    _type == 'image' => {
      '_id': asset._ref,
      _key,
      asset->,
      '_type': 'image',
      'related': ${relatedDocs}
    },
    _type == 'mux.video' => {
      '_id': asset._ref,
      _key,
      asset->,
      '_type': 'video',
      'related': ${relatedDocs}
    },
    _type == 'textAttachment' => {
      ...
    }
  }
}`

export const postQuery = `
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    ${postFields}
  }
}`

export const blogQuery = `
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`