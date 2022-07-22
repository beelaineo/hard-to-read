const eventFields = `
  _id,
  _createdAt,
  _updatedAt,
  publishedAt,
  title,
  "slug": slug.current,
  date,
  end_date,
  start,
  end,
  timezone,
  event_type,
  event_program,
  text,
  action_label,
  action_link,
  texts,
  images,
  videos,
  links,
  place,
  themes,
  persons,
`

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
      _key,
      '_id': _key,
      ...
    }
  }
}`

export const postQuery = `
*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
  ${postFields}
}
 `

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

export const eventQuery = `
*[_type == "event"] | order(date desc, _updatedAt desc) {
  ${eventFields}
}`

export const eventBySlugQuery = `
*[_type == "event" && slug.current == $slug][0] {
  ${eventFields}
}
`

export const eventSlugsQuery = `
*[_type == "event" && defined(slug.current)][].slug.current
`
