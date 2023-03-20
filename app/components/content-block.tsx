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
} from '../interfaces'
import { EventBlock } from './event-block'
import { ImageBlock } from './image-block'
import { VideoBlock } from './video-block'
import { PostBlock } from './post-block'
import { PressBlock } from './press-block'
import { PartnerBlock } from './partner-block'
import { PersonBlock } from './person-block'
import { BookBlock } from './book-block'
import { ThemeBlock } from './theme-block'

type DeltaPosition = {
  x: number
  y: number
}

interface PressPopupType extends Omit<PressType, 'clipping'> {
  clipping?: {
    url: string
    extension: string
  }
}

interface PartnerPopupType extends PartnerType {
  relatedDocs?: [Record<string, unknown>]
}

interface ContentBlockProps {
  content:
    | BookType
    | EventType
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
}

export const ContentBlock = React.forwardRef(
  (
    { content, isDragging, deltaPosition, color }: ContentBlockProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    switch (content._type) {
      case 'book':
        return <BookBlock content={content} color={color} />
      case 'event':
        return <EventBlock content={content} />
      case 'person':
        return <PersonBlock content={content} color={color} />
      case 'post':
        return <PostBlock content={content} />
      case 'press':
        return <PressBlock content={content} />
      case 'partner':
        return <PartnerBlock content={content} />
      case 'place':
        // return <PlaceBlock content={content} ref={ref} />
        return (
          <div>
            {content._type} - {content.name}
          </div>
        )
      case 'theme':
        return <ThemeBlock content={content} color={color} />
      case 'image':
        return <ImageBlock content={content} />
      case 'video':
        return (
          <VideoBlock
            content={content}
            isDragging={isDragging}
            deltaPosition={deltaPosition}
          />
        )
      default:
        // @ts-ignore
        console.warn(`No content block for type "${content._type}"`)
        return null
    }
  },
)
