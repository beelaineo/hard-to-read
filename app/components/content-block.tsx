import * as React from 'react'
import styled, { x, css } from '@xstyled/styled-components'
import {
  Book as BookType,
  Event as EventType,
  Person as PersonType,
  Post as PostType,
  Press as PressType,
  Place as PlaceType,
  Partner as PartnerType,
  MuxVideoBlock as VideoType,
  ImageBlock as ImageType,
  TextAttachmentBlock as TextAttachmentType,
  Theme as ThemeType,
  PdfAttachment,
  TextAttachment,
} from '../interfaces'
import { EventBlock } from './event-block'
import { ImageBlock } from './image-block'
import { VideoBlock } from './video-block'
import { PostBlock } from './post-block'
import { PressBlock } from './press-block'
import { PlaceBlock } from './place-block'
import { PartnerBlock } from './partner-block'
import { PersonBlock } from './person-block'
import { BookBlock } from './book-block'
import { ThemeBlock } from './theme-block'

type DeltaPosition = {
  x: number
  y: number
}

interface EventPopupType extends Omit<EventType, 'place' | 'books' | 'texts'> {
  related?: any[]
  place?: PlaceType
  books?: BookType[]
  texts?: Array<PdfAttachment | TextAttachment>
}

interface PressPopupType extends Omit<PressType, 'clipping'> {
  clipping?: {
    url: string
    extension: string
  }
}

interface PartnerPopupType extends Omit<PartnerType, 'place'> {
  related?: any[]
  place?: PlaceType[]
}
interface ContentBlockProps {
  content:
    | BookType
    | EventPopupType
    | PersonType
    | PostType
    | PlaceType
    | VideoType
    | PressPopupType
    | ImageType
    | TextAttachmentType
    | PartnerPopupType
    | ThemeType
  isDragging: boolean
  deltaPosition: DeltaPosition
  color?: string
  index: number
}

export const ContentBlock = React.forwardRef(
  (
    { content, isDragging, deltaPosition, color, index }: ContentBlockProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    switch (content._type) {
      case 'book':
        return <BookBlock content={content} color={color} index={index} />
      case 'event':
        return <EventBlock content={content} index={index} />
      case 'person':
        return <PersonBlock content={content} color={color} index={index} />
      case 'post':
        return <PostBlock content={content} index={index} />
      case 'press':
        return <PressBlock content={content} index={index} />
      case 'partner':
        return <PartnerBlock content={content} index={index} />
      case 'place':
        return <PlaceBlock content={content} index={index} />
      case 'theme':
        return <ThemeBlock content={content} color={color} index={index} />
      case 'image':
        return <ImageBlock content={content} index={index} />
      case 'video':
        return (
          <VideoBlock
            content={content}
            isDragging={isDragging}
            deltaPosition={deltaPosition}
            index={index}
          />
        )
      default:
        // @ts-ignore
        console.warn(`No content block for type "${content._type}"`)
        return null
    }
  },
)
