import * as React from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from '@xstyled/styled-components'
import { Event as EventType, SanityImage } from '../interfaces'
import { PortableText } from '@portabletext/react'
import { eventBlockDate } from '../utils'

const Wrapper = styled.div`
  height: auto;
  min-height: 240px;
  position: relative;
  width: 100%;
  display: block;
  position: relative;
  background-color: primary;
  padding: 6;
`

const TextWrapper = styled.div`
  margin: 0px;
  padding: 0;
  width: auto;
`

interface EventBlockProps {
  content: EventType
}

export const EventBlock = ({ content }) => {
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
    <Wrapper>
      <h2>{title}</h2>
      <div>
        {place?.name}
        <br />
        {place.address}
      </div>
      <div>{eventBlockDate(date)}</div>
      <TextWrapper>{text ? <PortableText value={text} /> : null}</TextWrapper>
    </Wrapper>
  )
}
