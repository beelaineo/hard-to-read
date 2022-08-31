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
}

const Wrapper = styled.div<WithColor>`
  ${({ color }) => css`
    position: relative;
    z-index: 0;
    margin: 0 -4;
    padding: 0 4;
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
        position: relative;
      }
    }
  `}
`

export const EventListing = ({ post }) => {
  const [namedPersons, setNamedPersons] = useState<string[]>([])
  const { addModals } = useModal()

  const handleItemClick = (post) => {
    addModals([modalize(post)])
  }

  console.log('event listing', post)
  const now = new Date()
  const date = new Date(post.date)

  const diffYears = differenceInCalendarYears(now, date)
  const diffDays = differenceInDays(now, date)

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
    >
      <x.a
        display={'grid'}
        gridTemplateColumns={'10'}
        alignItems={'baseline'}
        onClick={() => handleItemClick(post)}
        my={2}
        color={post.event_program == 'pillowtalk' ? 'secondary' : 'primary'}
      >
        <x.div gridColumn={'1 / 4'} fontSize={'lg'}>
          {/* date (required), end_date, start, end, timezone */}
          {diffDays < 1
            ? format(date, 'eeee, MMMM d')
            : format(date, 'MMMM yyyy')}
          {diffDays == 0
            ? ' (today!)'
            : diffDays > -90 && diffDays < 0
            ? ' (' + formatDistanceToNow(date, { addSuffix: true }) + ')'
            : null}
          <br />
          {diffDays < 1 && post.start ? post.start : null}
          {diffDays < 1 && post.start && post.end ? ' to ' + post.end : null}
          {diffDays < 1 && post.start && post.timezone
            ? ' ' + post.timezone
            : null}
          {diffDays < 1 && post.start && post.end && post.end_date
            ? ', ends ' + format(new Date(post.end_date), 'MMM d')
            : post.end_date && diffDays < 1
            ? 'ends ' + format(new Date(post.end_date), 'eeee, MMMM d')
            : null}
        </x.div>
        <x.div gridColumn={'span 4'} px={2} color={'black'}>
          <x.h2 fontSize={'2xl'} mb={0}>
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
        <x.div gridColumn={'8 / 10'} px={5} fontSize={'lg'}>
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
