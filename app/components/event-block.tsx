import * as React from 'react'
import ReactDOM from 'react-dom'
import styled, { css, textDecoration, x } from '@xstyled/styled-components'
import { Event as EventType, SanityImage } from '../interfaces'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { eventBlockDate, modalize } from '../utils'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import { useModal } from '../providers/ModalProvider'
import Link from 'next/link'
import { popupDocs, relatedDocs } from '../lib/queries'

interface WithLoaded {
  loaded: boolean
  program: 'hardtoread' | 'pillowtalk'
}

const Wrapper = styled.div<WithLoaded>`
  ${({ loaded, program }) => css`
    height: auto;
    min-height: 240px;
    position: relative;
    width: 100%;
    display: block;
    position: relative;
    background-color: ${program == 'pillowtalk' ? 'secondary20' : 'primary20'};
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

const MediaWrapper = styled.div`
  margin: 1rem 0px;
  padding: 0;
  width: auto;
  display: block;
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
            `*[_id == "${value.reference._ref}"][0]{
              _type == 'person' => {
                ...,
                'title': name
              },
              'related': *[_type != 'home' && _type != 'popups' && references(^._id)]{ title, _type, _id, slug, ... }
            }
            `,
          )
          addModals([modalize(doc)])
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
    <Wrapper loaded={loaded} program={event_program}>
      <h2>{title}</h2>
      <p>
        <Link href={`/places/${place?.slug?.current}`}>
          <x.a
            pt={0}
            display={'inline-block'}
            textDecoration={'underline'}
            color={'primary'}
          >
            {place?.name}
          </x.a>
        </Link>
        <br />
        {place.address}
      </p>
      <p>{eventBlockDate(date)}</p>
      {action_link && (
        <x.a
          href={action_link}
          color={'primary'}
          target="_blank"
          rel="noreferrer"
          display={'inline-block'}
          p={'4 0'}
          textDecoration={'underline'}
        >
          {action_label ? action_label : 'Link'} →
        </x.a>
      )}
      <TextWrapper>
        {text ? <PortableText value={text} components={ptComponents} /> : null}
      </TextWrapper>
      {texts && texts.length > 0 && (
        <MediaWrapper>
          <span>Text: </span>
          {texts &&
            texts.map((text, i) => (
              <x.a
                key={i}
                onClick={() => addModals([modalize(text)])}
                target="_blank"
                rel="noreferrer"
                display={'inline'}
              >
                {text.title || text.asset.originalFilename || 'Untitled'}
                {i < texts.length - 1 ? ', ' : ''}
              </x.a>
            ))}
        </MediaWrapper>
      )}
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
