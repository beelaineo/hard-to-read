import { MdOutlinePlace } from 'react-icons/md'

export const place = {
  name: 'place',
  title: 'Place',
  type: 'document',
  icon: MdOutlinePlace,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 160,
      },
    },
    {
      name: 'address',
      title: 'Address',
      type: 'text',
    },
    {
      title: 'Location',
      name: 'location',
      type: 'geopoint'
    },
    {
      name: 'link',
      title: 'Link (optional)',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'address',
    },
  },
}
