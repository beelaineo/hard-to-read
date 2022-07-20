import { VscPerson } from 'react-icons/vsc'

export const person = {
  name: 'person',
  title: 'Person',
  type: 'document',
  icon: VscPerson,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 120,
      },
    },
    {
      name: 'sortby_name',
      title: 'Sort by Name (Last)',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Link (optional)',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
}
