const eventFields = `
  _id,
  _createdAt,
  _type,
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
  place->,
  themes[]->,
  persons[]->,
`

const postFields = `
  _id,
  _createdAt,
  _type,
  _updatedAt,
  publishedAt,
  title,
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug,
        "type": @.reference->_type
      }
    }
  },
  themes,
  "slug": slug.current,
`

const personFields = `
  _id,
  _createdAt,
  _type,
  _updatedAt,
  "title": name,
  sortby_name,
  "slug": slug.current,
  "totalReferences": count(*[_type in ['event', 'post'] && references(^._id)]),
`

const themeFields = `
  _id,
  _createdAt,
  _type,
  _updatedAt,
  title,
  "slug": slug.current,
  "totalReferences": count(*[_type in ['event', 'post'] && references(^._id)]),
`

const partnerFields = `
  _id,
  _createdAt,
  _type,
  _updatedAt,
  title,
  type,
  "slug": slug.current,
`

const pressFields = `
  _id,
  _createdAt,
  _type,
  _updatedAt,
  title,
  date,
  publication,
  link,
  clipping {
    asset->{url}
  }
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
*[_type == "post"] | order(publishedAt desc) {
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
*[_type == "event" && event_type != "exhibition"] | order(date desc, _updatedAt desc) {
  ${eventFields}
}`

export const eventBySlugQuery = `
*[_type == "event" && slug.current == $slug][0] {
  ${eventFields}
}
`

export const eventSlugsQuery = `
*[_type == "event" && event_type != "exhibition" && defined(slug.current)][].slug.current
`

export const exhibitionQuery = `
*[_type == "event" && event_type == "exhibition" ] | order(date desc, _updatedAt desc) {
  ${eventFields}
}`

export const exhibitionBySlugQuery = `
*[_type == "event" && slug.current == $slug][0] {
  ${eventFields}
}
`

export const exhibitionSlugsQuery = `
*[_type == "event" && event_type == "exhibition" && defined(slug.current)][].slug.current
`

export const peopleQuery = `
*[_type == "person"] {
  ${personFields}
} | order(totalReferences desc, sortby_name asc)`

export const personSlugsQuery = `
*[_type == "person" && defined(slug.current)][].slug.current
`

export const personBySlugQuery = `
*[_type == "person" && slug.current == $slug][0] {
  ${personFields}
}
`

export const docsByPersonQuery = `
*[_type != "site" && references($person._id)] {
  _id,
  "title": coalesce(name, title),
  "slug": slug.current,
}
`

export const themeQuery = `
*[_type == "theme"] | order(sortby_name asc) {
  ${themeFields}
}`

export const themeSlugsQuery = `
*[_type == "theme" && defined(slug.current)][].slug.current
`

export const themeBySlugQuery = `
*[_type == "theme" && slug.current == $slug][0] {
  ${themeFields}
}
`

export const partnerQuery = `
*[_type == "partner"] | order(title asc) {
  ${partnerFields}
}`

export const pressQuery = `
*[_type == "press"] | order(date desc) {
  ${pressFields}
}`
