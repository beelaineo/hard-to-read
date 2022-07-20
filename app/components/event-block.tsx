import * as React from 'react'
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable'
import styled, { Box, css } from '@xstyled/styled-components'
import { Event as EventType, SanityImage } from '../interfaces'
import { PortableText } from '@portabletext/react'

const Wrapper = styled.div`
  height: auto;
  position: relative;
  width: 360px;
  display: block;
  position: relative;
  border: 1px solid black;
  background-color: lightpink;
`

const TextWrapper = styled.div`
  margin: 16px;
  padding: 0;
  width: auto;
  }
`

interface EventBlockProps {
  content: EventType
}

export const EventBlock = ({ content }: EventBlockProps) => {
  const {
    title,
    slug,
    date,
    end_date,
    start,
    end,
    timezone,
    event_type,
    event_program,
    text,
    action_label,
    action_link,
    texts,
    images,
    videos,
    links,
    place,
    themes,
    persons,
  } = content

  return (
    <Draggable>
      <Wrapper>
        <h2>{title}</h2>
        <TextWrapper>{text ? <PortableText value={text} /> : null}</TextWrapper>
      </Wrapper>
    </Draggable>
  )
}
