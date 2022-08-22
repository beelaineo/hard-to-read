import { GiBookAura } from 'react-icons/gi'

export const book = {
  title: 'Book',
  name: 'book',
  type: 'document',
  icon: GiBookAura,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Author',
      name: 'author',
      type: 'string',
    },
    {
      title: 'Reference to Person?',
      name: 'authorRef',
      type: 'array',
      of: [{name: 'personRef', type: 'reference', to: {type: 'person'}}]
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 120,
      },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Link',
      name: 'link',
      type: 'url',
    },
    {
      title: 'Date Published',
      name: 'date',
      type: 'date',
    },
    {
      title: 'PDF or Image (optional)',
      name: 'clipping',
      type: 'file',
      description: 'Upload a PDF, PNG, or JPEG.',
      accept: 'image/*,.pdf',
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author'
    },
    prepare(selection) {
      const {title, author} = selection
      return {
        title: title,
        subtitle: author
      }
    }
  },
  orderings: [
    {
      title: 'Last Updated, New',
      name: 'dateDesc',
      by: [
        {field: '_updatedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Last Updated, Old',
      name: 'dateAsc',
      by: [
        {field: '_updatedAt', direction: 'asc'}
      ]
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    },
    {
      title: 'Author',
      name: 'authorAsc',
      by: [
        {field: 'author', direction: 'asc'}
      ]
    },
  ]
}