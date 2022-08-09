import { FaRegHandshake } from 'react-icons/fa'

export const partner = {
  title: 'Partner',
  name: 'partner',
  type: 'document',
  icon: FaRegHandshake,
  fields: [
    {
      title: 'Name',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Type',
      name: 'type',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          {title: 'Publishing', value: 'default'},
          {title: 'Sponsoring', value: 'sponsor'},
          {title: 'Fundraising', value: 'fundraiser'},
          {title: 'Venue', value: 'venue'},
        ],
        layout: 'radio'
      }
    },
    {
      title: 'Associated Places',
      name: 'place',
      type: 'array',
      of: [{name: 'placeRef', type: 'reference', to: {type: 'place'}}],
      hidden: ({document}) => document?.type != 'venue',
    },
    {
      title: 'Link (optional)',
      name: 'link',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
    },
    prepare(selection) {
      const {title, type} = selection
      return {
        title: title,
        subtitle: type
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
      title: 'Name',
      name: 'title',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    },
  ]
}