const Schema = require("@sanity/schema").default

module.exports = Schema.compile({
  name: "myBlog",
  types: [
    {
      name: 'event',
      type: 'document',
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
          type: 'datetime',
        },
        {
          name: 'end',
          title: 'End time (optional)',
          type: 'datetime',
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
          title: 'Text',
          name: 'text',
          type: 'array',
          of: [
            {
              title: 'Block',
              type: 'block',
              styles: [
                {title: 'Normal', value: 'normal'},
                {title: 'H1', value: 'h1'},
                {title: 'H2', value: 'h2'},
                {title: 'H3', value: 'h3'},
                {title: 'H4', value: 'h4'},
                {title: 'Quote', value: 'blockquote'},
              ],
              lists: [{title: 'Bullet', value: 'bullet'}],
              marks: {
                decorators: [
                  {title: 'Strong', value: 'strong'},
                  {title: 'Emphasis', value: 'em'},
                ],
                annotations: [
                  {
                    title: 'URL',
                    name: 'link',
                    type: 'object',
                    fields: [
                      {
                        title: 'URL',
                        name: 'href',
                        type: 'url',
                      },
                    ],
                  },
                ],
              },
            },
            {
              type: 'image',
              options: {hotspot: true},
            },
          ],
        },
      ]
    }]
  })
