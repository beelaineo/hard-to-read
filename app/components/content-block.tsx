import * as React from 'react'
import {
  Event as EventType,
  Person as PersonType,
  Post as PostType,
  Place as PlaceType,
  MuxVideoBlock as VideoType,
  ImageBlock as ImageType,
  TextAttachmentBlock as TextAttachmentType,
  Theme as ThemeType,
} from '../interfaces'
import { EventBlock } from './event-block'
interface ContentBlockProps {
  content: EventType | PersonType | PostType | PlaceType | VideoType | ImageType | TextAttachmentType | ThemeType
}

export const ContentBlock = React.forwardRef(
  ({ content }: ContentBlockProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    switch (content._type) {
      case 'event':
        return <EventBlock content={content}/>
      // case 'person':
      //   return <PersonBlock content={content} ref={ref}/>
      // case 'post':
      //   return <PostBlock content={content} ref={ref}/>
      // case 'place':
      //   return <PlaceBlock content={content} ref={ref}/>
      // case 'theme':
      //   return <ThemeBlock content={content} ref={ref}/>
      // case 'image':
      //   return <ImageBlock content={content} ref={ref}/>
      // case 'video':
      //   return <VideoBlock content={content} ref={ref}/>
      default:
        // @ts-ignore
        console.warn(`No content block for type "${content._type}"`)
        return null
    }
  },
)
