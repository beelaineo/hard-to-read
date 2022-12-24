import * as React from 'react'
import ReactDOM from 'react-dom'
import styled, { css, x } from '@xstyled/styled-components'
import { Event as EventType, SanityImage } from '../interfaces'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { eventBlockDate, modalize } from '../utils'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import { useModal } from '../providers/ModalProvider'
import Link from 'next/link'

interface WithLoaded {
  loaded: boolean
}

const Wrapper = styled.div<WithLoaded>`
  ${({ loaded }) => css`
    height: auto;
    min-height: 240px;
    position: relative;
    width: 100%;
    display: block;
    position: relative;
    background-color: primary20;
    padding: 6;
    p {
      color: ${loaded ? 'black' : 'primary0'};
      transition: color 10s ease-in-out;
    }
    a.permalink {
      color: ${loaded ? 'primary' : 'primary0'};
      transition: color 10s ease-in-out;
    }
    p a {
      color: secondary;
    }
  `}
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
  const { addModals } = useModal()
  const curClient = getClient(false)
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    setTimeout(function () {
      setLoaded(true)
    }, 3000)
  }, [])

  const ptComponents: PortableTextComponents = {
    marks: {
      internalLink: ({ children, value }) => {
        const handleItemClick = async (value) => {
          const doc = await curClient.fetch(
            `*[_id == "${value.reference._ref}"][0]`,
          )
          addModals([modalize(doc)])
          console.log('refDoc', doc)
        }
        return (
          <x.a
            textDecoration={'underline'}
            zIndex={1}
            onClick={() => handleItemClick(value)}
            onMouseDown={(e) => e.stopPropagation()}
            color={'secondary'}
          >
            {children}
          </x.a>
        )
      },
    },
  }

  return (
    <Wrapper loaded={loaded}>
      <h2>{title}</h2>
      <p>
        {place?.name}
        <br />
        {place.address}
      </p>
      <p>{eventBlockDate(date)}</p>
      <TextWrapper>
        {text ? <PortableText value={text} components={ptComponents} /> : null}
      </TextWrapper>
      <Link href={`/${event_type}s/${slug?.current}`}>
        <x.a
          pt={4}
          display={'inline-block'}
          textDecoration={'underline'}
          color={'primary'}
          className={'permalink'}
        >
          (permalink)
        </x.a>
      </Link>
    </Wrapper>
  )
}
