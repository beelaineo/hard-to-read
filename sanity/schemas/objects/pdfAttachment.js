import { AiOutlineFilePdf } from 'react-icons/ai'

export const pdfAttachment = {
  name: 'pdfAttachment',
  title: 'PDF',
  type: 'file',
  accept: '.pdf',
  icon: AiOutlineFilePdf,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
}
