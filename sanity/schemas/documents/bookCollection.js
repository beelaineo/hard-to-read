import { GiBookshelf } from 'react-icons/gi'

export const bookCollection = {
  title: 'Book Collection',
  name: 'bookCollection',
  type: 'document',
  icon: GiBookshelf,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string',
    },
    {
      title: 'Place / Venue',
      name: 'place',
      type: 'array',
      of: [{name: 'placeRef', type: 'reference', to: {type: 'place'}}]
    },
    {
      title: 'Display Date',
      name: 'display_date',
      type: 'string',
    },
    {
      title: 'End Date (leave blank if ongoing)',
      name: 'date',
      type: 'date',
    },
    {
      title: 'Books',
      name: 'books',
      type: 'array',
      of: [{name: 'bookRef', type: 'reference', to: {type: 'book'}}]
    },
  ],
  preview: {
    select: {
      title: 'title',
      place: 'place.0.name'
    },
    prepare(selection) {
      const {title, place} = selection
      return {
        title: title,
        subtitle: 'at ' + place
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
    {
      title: 'Date',
      name: 'dateDesc',
      by: [
        {field: 'date', direction: 'desc'}
      ]
    },
  ]
}