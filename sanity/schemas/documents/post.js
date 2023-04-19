import { GiScrollUnfurled } from 'react-icons/gi'

export const post = {
  name: 'post',
  title: 'Blog',
  type: 'document',
  icon: GiScrollUnfurled,
  initialValue: {
    post_program: 'hardtoread',
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      codegen: { required: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      codegen: { required: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'post_program',
      title: 'Post program',
      type: 'string',
      codegen: { required: true },
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Hard to Read', value: 'hardtoread'},
          {title: 'Pillow Talk', value: 'pillowtalk'}
        ],
        layout: 'radio'
      },
    },
    {
      name: 'themes',
      title: 'Themes',
      type: 'array',
      of: [{type: 'reference', to: {type: 'theme'}}],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
    },
  },
}
