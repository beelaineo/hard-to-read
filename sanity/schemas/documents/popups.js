import { AiOutlineAlert } from 'react-icons/ai'

const popupDocs = [{name: 'eventRef', type: 'reference', to: {type: 'event'}}, {name: 'personRef', type: 'reference', to: {type: 'person'}}, {name: 'placeRef', type: 'reference', to: {type: 'place'}}, {name: 'postRef', type: 'reference', to: {type: 'post'}}, {type: 'image'}, {type: 'mux.video'}, {name: 'themeRef', type: 'reference', to: {type: 'theme'}}, {name: 'pressRef', type: 'reference', to: {type: 'press'}}, {type: 'textAttachment'}]

export const popups = {
  name: 'popups',
  title: 'Pop-ups',
  icon: AiOutlineAlert,
  type: 'document',
  // __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'events',
      title: 'Events Page Pop-ups',
      type: 'array',
      of: popupDocs,
    },
    {
      name: 'people',
      title: 'People Page Pop-ups',
      type: 'array',
      of: popupDocs,
    },
    {
      name: 'blog',
      title: 'Blog Page Pop-ups',
      type: 'array',
      of: popupDocs,
    },
    {
      name: 'themes',
      title: 'Themes Page Pop-ups',
      type: 'array',
      of: popupDocs,
    },
    {
      name: 'press',
      title: 'Press Page Pop-ups',
      type: 'array',
      of: popupDocs,
    },
    {
      name: 'partners',
      title: 'Partners Page Pop-ups',
      type: 'array',
      of: popupDocs,
    },
  ],

  preview: {
    select: {
    },
    prepare(selection) {
      return {
        title: 'Pop-up Settings',
      }
    }
  }
}
