export const textAttachment = {
  name: 'textAttachment',
  title: 'Text',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
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
