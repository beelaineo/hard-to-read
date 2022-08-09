import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import siteSettings from './siteSettings'

import * as documents from './documents'
import * as objects from './objects'

const { event, person, place, post, book, bookCollection, theme, press, home, popups, partner } = documents
const { blockContent, externalLink, textAttachment,pdfAttachment } = objects

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    event,
    person,
    place,
    post,
    book,
    bookCollection,
    theme,
    press,
    partner,
    home,
    popups,
    blockContent,
    externalLink,
    siteSettings,
    textAttachment,
    pdfAttachment,
  ]),
})
