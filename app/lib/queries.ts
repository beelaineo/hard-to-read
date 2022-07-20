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

export const indexQuery = `
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
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