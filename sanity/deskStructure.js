import S from '@sanity/desk-tool/structure-builder'
import { AiOutlineGlobal, AiOutlineHome } from 'react-icons/ai'

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site')
        .icon(AiOutlineGlobal)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.listItem()
        .title('Home')
        .icon(AiOutlineHome)
        .child(
          S.document()
            .schemaType('home')
            .documentId('home')
        ),
      ...S.documentTypeListItems().filter(listItem => !['siteSettings','home'].includes(listItem.getId()))
    ])