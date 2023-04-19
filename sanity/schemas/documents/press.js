import { GiNewspaper } from 'react-icons/gi'

export const press = {
  title: 'Press',
  name: 'press',
  type: 'document',
  icon: GiNewspaper,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      codegen: { required: true },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Date',
      name: 'date',
      type: 'date',
    },
    {
      title: 'Publication',
      name: 'publication',
      type: 'string',
    },
    {
      title: 'Link',
      name: 'link',
      type: 'url',
    },
    {
      title: 'PDF or Image (optional)',
      name: 'clipping',
      type: 'file',
      description: 'Upload a PDF, PNG, or JPEG press clipping (overrides link field).',
      accept: 'image/*,.pdf',
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      publication: 'publication'
    },
    prepare(selection) {
      const {title, date, publication} = selection
      return {
        title: title,
        subtitle: publication + ', ' + date.split('-')[0]
      }
    }
  },
  orderings: [
    {
      title: 'Date, New',
      name: 'dateDesc',
      by: [
        {field: 'date', direction: 'desc'}
      ]
    },
    {
      title: 'Date, Old',
      name: 'dateAsc',
      by: [
        {field: 'date', direction: 'asc'}
      ]
    },
    {
      title: 'Publication',
      name: 'publicationDesc',
      by: [
        {field: 'publication', direction: 'asc'}
      ]
    },
  ]
}