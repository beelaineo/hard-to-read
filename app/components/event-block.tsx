import * as React from 'react'
import ReactDOM from 'react-dom'
import styled, { css, textDecoration, x } from '@xstyled/styled-components'
import {
  Event as EventType,
  Place as PlaceType,
  Book as BookType,
  BlockContent,
  SanityImage,
  PdfAttachment,
  TextAttachment,
} from '../interfaces'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import {
  eventBlockDate,
  modalize,
  modalizeImage,
  alphanumerize,
} from '../utils'
import { modalizeVideo } from '../utils/data'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import { useModal } from '../providers/ModalProvider'
import Link from 'next/link'
import { popupDocs, relatedDocs } from '../lib/queries'
import { imageConfigDefault } from 'next/dist/shared/lib/image-config'

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
      color: ${'primary'};
      transition: color 10s ease-in-out;
    }
    p a {
      color: secondary;
    }
  `}
`

const TextWrapper = styled.div`
  margin: 4 0px 0 0;
  padding: 0;
  width: auto;
  p {
    margin: 4 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const MediaWrapper = styled.div`
  margin: 1rem 0px;
  padding: 0;
  width: auto;
  display: block;
  span {
    transition: color 10s ease-in-out;
  }
`
interface EventPopupType extends Omit<EventType, 'place' | 'books' | 'texts'> {
  related?: any[]
  place?: PlaceType
  books?: BookType[]
  texts?: Array<PdfAttachment | TextAttachment>
}

interface EventBlockProps {
  content: EventPopupType
  index: number
}

export const EventBlock = ({ content, index }: EventBlockProps) => {
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
    books,
    place,
    themes,
    persons,
  } = content
  const { addModals, insertModal } = useModal()
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
          // addModals([modalize(doc)])
          insertModal(modalize(doc), index)
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
      link: ({ children, value }) => {
        return (
          <x.a
            href={value.href}
            rel="noreferrer"
            textDecoration={'underline'}
            zIndex={2}
            color={'secondary'}
            target="_blank"
          >
            {children}
          </x.a>
        )
      },
    },
  }

  const getTextTitle = (text) => {
    if (text.title) {
      return text.title
    } else if (text.asset) {
      return text.asset.originalFilename
    } else {
      return 'Untitled'
    }
  }

  return (
    <Wrapper loaded={loaded} program={event_program}>
      <h2>{title}</h2>
      {place && (
        <p>
          <x.a
            pt={0}
            display={'inline-block'}
            textDecoration={'underline'}
            color={'primary'}
            onClick={() => insertModal(modalize(place), index)}
          >
            {place?.name}
          </x.a>
          <br />
          {place?.address}
        </p>
      )}
      <p>{eventBlockDate(date)}</p>
      {action_link && (
        <x.a
          href={action_link}
          color={'primary'}
          target="_blank"
          rel="noreferrer"
          display={'inline-block'}
          borderWidth={1}
          borderStyle={'solid'}
          m={'2 0'}
          p={'2 3'}
          backgroundColor={{ _: 'transparent', hover: 'primary20' }}
        >
          {action_label ? action_label : 'Link'} →
        </x.a>
      )}
      <TextWrapper>
        {text ? <PortableText value={text} components={ptComponents} /> : null}
      </TextWrapper>
      {books && books.length > 0 && (
        <MediaWrapper>
          <x.span color={loaded ? 'black' : 'primary0'}>Books: </x.span>
          {books &&
            books.map((book, i) => (
              <x.a
                key={i}
                onClick={() => addModals([modalize(book)])}
                target="_blank"
                rel="noreferrer"
                display={'inline'}
                color={'primary'}
              >
                {book.title ?? 'Book ' + (i + 1)}
                {i < books.length - 1 ? ', ' : ''}
              </x.a>
            ))}
        </MediaWrapper>
      )}
      {texts && texts.length > 0 && (
        <MediaWrapper>
          <x.span color={loaded ? 'black' : 'primary0'}>Text: </x.span>
          {texts &&
            texts.map((text, i) => (
              <x.a
                key={i}
                onClick={() => addModals([modalize(text)])}
                target="_blank"
                rel="noreferrer"
                display={'inline'}
                color={'primary'}
              >
                {getTextTitle(text)}
                {i < texts.length - 1 ? ', ' : ''}
              </x.a>
            ))}
        </MediaWrapper>
      )}
      {images && images.length > 0 && (
        <MediaWrapper>
          <x.span color={loaded ? 'black' : 'primary0'}>Images: </x.span>
          {images &&
            images.map((image, i) => (
              <x.a
                key={i}
                onClick={() => addModals([modalizeImage(image)])}
                target="_blank"
                rel="noreferrer"
                display={'inline'}
                color={'primary'}
              >
                Image {alphanumerize(i)}
                {i < images.length - 1 ? ', ' : ''}
              </x.a>
            ))}
        </MediaWrapper>
      )}
      {videos && videos.length > 0 && (
        <MediaWrapper>
          <x.span color={loaded ? 'black' : 'primary0'}>Videos: </x.span>
          {videos &&
            videos.map((video, i) => (
              <x.a
                key={i}
                onClick={() => addModals([modalizeVideo(video)])}
                target="_blank"
                rel="noreferrer"
                display={'inline'}
                color={'primary'}
              >
                Video {alphanumerize(i)}
                {i < videos.length - 1 ? ', ' : ''}
              </x.a>
            ))}
        </MediaWrapper>
      )}
      {links && links.length > 0 && (
        <MediaWrapper>
          <x.span color={loaded ? 'black' : 'primary0'}>Links: </x.span>
          {links &&
            links.map((link, i) => (
              <x.a
                key={i}
                target="_blank"
                rel="noreferrer"
                display={'inline'}
                color={'primary'}
                href={link.url}
              >
                {link.title ? link.title : `Link ${i + 1}`}
                {i < links.length - 1 ? ', ' : ''}
              </x.a>
            ))}
        </MediaWrapper>
      )}
      <Link href={`/${event_type}s/${slug?.current}`} legacyBehavior>
        <x.a
          pt={4}
          display={'inline-block'}
          textDecoration={'underline'}
          color={'primary'}
          className={'permalink'}
          fontSize={12}
        >
          (permalink)
        </x.a>
      </Link>
    </Wrapper>
  )
}
