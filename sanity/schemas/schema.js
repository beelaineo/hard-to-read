import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import siteSettings from './siteSettings'

import * as documents from './documents'
import * as objects from './objects'

const { event, person, place, post, theme, press, home, partner } = documents
const { blockContent, externalLink, textAttachment,pdfAttachment } = objects

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    event,
    person,
    place,
    post,
    theme,
    press,
    partner,
    home,
    blockContent,
    externalLink,
    siteSettings,
    textAttachment,
    pdfAttachment,
  ]),
})
