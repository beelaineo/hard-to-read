import { AiOutlineGlobal } from 'react-icons/ai'
import { BiLink } from 'react-icons/bi'

export default {
  name: 'siteSettings',
  title: 'Site Settings',
  icon: AiOutlineGlobal,
  type: 'document',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text'
    },
    {
      name: 'about',
      title: 'About Page',
      type: 'blockContent'
    },
    {
      name: 'socials',
      title: 'Socials',
      type: 'array',
      of: [
        { type: 'object', fields: [
          { type: 'string', name: 'title', title: 'Social Channel' },
          { type: 'url', name: 'url', title: 'URL' },
        ], icon: BiLink },
      ]
    }
  ]
}