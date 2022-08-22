import { AiFillRead } from 'react-icons/ai'

export const event = {
  name: 'event',
  title: 'Event',
  icon: AiFillRead,
  type: 'document',
  initialValue: {
    event_type: 'event',
    event_program: 'hardtoread',
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
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
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'end_date',
      title: 'End Date (optional)',
      type: 'date',
    },
    {
      name: 'start',
      title: 'Start time (optional)',
      type: 'string',
    },
    {
      name: 'end',
      title: 'End time (optional)',
      type: 'string',
    },
    {
      name: 'timezone',
      title: 'Timezone (optional)',
      type: 'string',
    },
    {
      name: 'event_type',
      title: 'Event type',
      type: 'string',
      options: {
        list: [
          {title: 'Event', value: 'event'},
          {title: 'Exhibition', value: 'exhibition'}
        ],
        layout: 'radio'
      },
    },
    {
      name: 'event_program',
      title: 'Event program',
      type: 'string',
      options: {
        list: [
          {title: 'Hard to Read', value: 'hardtoread'},
          {title: 'Pillow Talk', value: 'pillowtalk'}
        ],
        layout: 'radio'
      },
    },
    {
      name: 'text',
      title: 'Text',
      type: 'blockContent',
    },
    {
      name: 'action_label',
      title: 'Action label',
      type: 'string',
    },
    {
      name: 'action_link',
      title: 'Action link',
      type: 'url',
    },
    {
      name: 'books',
      title: 'Books and Collections',
      type: 'array',
      of: [{name: 'bookRef', type: 'reference', to: {type: 'book'}}, {name: 'collectionRef', type: 'reference', to: {type: 'bookCollection'}}],
    },
    {
      name: 'texts',
      title: 'Texts',
      type: 'array',
      of: [{type: 'textAttachment'}, {type: 'pdfAttachment'}],
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
    },
    {
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [{type: 'mux.video'}],
    },
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{type: 'externalLink'}],
    },
    {
      name: 'persons',
      title: 'Persons',
      type: 'array',
      of: [{type: 'reference', to: {type: 'person'}}],
    },
    {
      name: 'place',
      title: 'Place',
      type: 'reference',
      to: {type: 'place'},
    },
    {
      name: 'themes',
      title: 'Themes',
      type: 'array',
      of: [{type: 'reference', to: {type: 'theme'}}],
    },
  ],
  orderings: [
    {
      title: 'Last Edited',
      name: 'dateDesc',
      by: [
        {field: '_updatedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Date',
      name: 'eventDateDesc',
      by: [
        {field: 'date', direction: 'desc'}
      ]
    },
    {
      title: 'Name',
      name: 'title',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    },
  ],

  preview: {
    select: {
      title: 'title',
      date: 'date',
      place: 'place.name',
    },
    prepare(selection) {
      const {title, date, place} = selection
      return {
        title: title,
        subtitle: date && place ? `${date} - ${place}` : '',
      }
    }
  },
}
