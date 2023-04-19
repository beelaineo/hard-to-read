import { AiOutlineTags } from 'react-icons/ai'

export const theme = {
  name: 'theme',
  title: 'Theme',
  type: 'document',
  icon: AiOutlineTags,
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
  ],
}
