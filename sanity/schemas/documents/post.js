import { GiScrollUnfurled } from 'react-icons/gi'

export const post = {
  name: 'post',
  title: 'Blog',
  type: 'document',
  icon: GiScrollUnfurled,
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
        maxLength: 96,
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
