import { AiOutlineHome } from 'react-icons/ai'

export const home = {
  name: 'home',
  title: 'Home',
  icon: AiOutlineHome,
  type: 'document',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Featured Content',
      type: 'array',
      of: [{name: 'eventRef', type: 'reference', to: {type: 'event'}}, {name: 'personRef', type: 'reference', to: {type: 'person'}}, {name: 'placeRef', type: 'reference', to: {type: 'place'}}, {name: 'postRef', type: 'reference', to: {type: 'post'}}, {type: 'image'}, {type: 'mux.video'}, {name: 'themeRef', type: 'reference', to: {type: 'theme'}}, {type: 'textAttachment'}],
    },
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
}
