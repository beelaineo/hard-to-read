import * as React from 'react'
import ReactDOM from 'react-dom'
import styled, { x, css } from '@xstyled/styled-components'
import { Event as EventType, SanityImage, Modal } from '../interfaces'
import { PortableText } from '@portabletext/react'
import {
  format,
  formatDistanceToNow,
  differenceInCalendarYears,
  differenceInDays,
} from 'date-fns'
import { eventBlockDate, modalize } from '../utils'
import { useModal } from '../providers/ModalProvider'

const { useEffect, useState } = React

interface WithColor {
  color: string
  i: number
}

const Wrapper = styled.div<WithColor>`
  ${({ color, i }) => css`
    position: relative;
    z-index: 0;
    border: 1px solid;
    border-color: ${color};
    min-height: 67vh;
    grid-column: ${(i % 3) - 1 === 0 ? 'span 4' : 'span 3'};
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    justify-content: center;
    a {
      position: relative;
      display: flex;
      height: 100%;
      max-width: 75%;
      margin: auto;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 4;
      text-align: center;
    }
    &:hover {
      background-color: ${color};
      &:after {
        position: absolute;
        content: '';
        background-color: #fff;
        opacity: 0.85;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 0;
        pointer-events: none;
      }
      a {
        z-index: 1;
      }
    }
  `}
`

// title,
// date,
// end_date,
// start,
// end,
// timezone,
// event_type,
// event_program,
// text,
// action_label,
// action_link,
// texts,
// images,
// videos,
// links,
// place,
// themes,
// persons,

export const ExhibitionListing = ({ post, i }) => {
  const [namedPersons, setNamedPersons] = useState<string[]>([])
  const { addModals } = useModal()

  const handleItemClick = (post) => {
    addModals([modalize(post)])
  }

  console.log('event listing', post)
  const now = new Date()
  const date = new Date(post.date)

  const diffDays = differenceInDays(now, date)

  const formatRange = (d1, d2, locale) => {
    return new Intl.DateTimeFormat(locale, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      //@ts-ignore
    }).formatRange(d1, d2)
  }

  const end = new Date(post.end_date)

  useEffect(() => {
    const sortedPersons = post.persons?.sort((a, b) =>
      a?.sortby_name > b?.sortby_name ? 1 : -1,
    )
    setNamedPersons(sortedPersons?.map((p) => p?.name))
  }, [])

  return (
    <Wrapper
      color={post.event_program == 'pillowtalk' ? 'secondary' : 'primary'}
      key={post._id}
      i={i}
    >
      <x.a
        onClick={() => handleItemClick(post)}
        my={2}
        color={post.event_program == 'pillowtalk' ? 'secondary' : 'primary'}
      >
        <x.div fontSize={'lg'}>
          {/* date (required), end_date, start, end, timezone */}
          {date && end
            ? formatRange(date, end, 'en')
            : date
            ? format(date, 'MMMM d, yyyy')
            : null}
          {diffDays < 1 ? <br /> : null}
          {diffDays < 1 ? 'opening note here' : null}
        </x.div>
        <x.div px={2} color={'black'}>
          <x.h2 fontSize={'3xl'} mb={0}>
            <x.span>{post.title}</x.span>
          </x.h2>
          {namedPersons?.length > 0 ? (
            <x.div
              color={
                post.event_program == 'pillowtalk' ? 'secondary' : 'primary'
              }
              fontSize={'lg'}
              pt={2}
            >
              {namedPersons.join(', ')}
            </x.div>
          ) : null}
        </x.div>
        <x.div px={5} fontSize={'lg'}>
          {post.themes
            ? post.themes
                .map((t) => {
                  return t.title
                })
                .join(', ')
            : null}
        </x.div>
      </x.a>
    </Wrapper>
  )
}
