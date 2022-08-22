import * as React from 'react'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'

const Preview = ({value}) => {
	const { url } = value
	const id = getYouTubeId(url)
	return (<YouTube videoId={id} />)
}

export const youtube = {
  name: 'youtube',
  type: 'object',
  title: 'YouTube',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'YouTube video URL'
    },
    {
      name: 'time',
      type: 'number',
      title: 'Start time (optional)',
      description: 'in seconds'
    }
  ],
  preview: {
  	select: {
  		url: 'url'
  	},
  	component: Preview
  }
}