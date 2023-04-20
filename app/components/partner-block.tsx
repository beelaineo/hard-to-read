import * as React from 'react'
import ReactDOM from 'react-dom'
import styled, { css, x } from '@xstyled/styled-components'
import {
  Partner as PartnerType,
  Place as PlaceType,
  SanityImage,
} from '../interfaces'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { postBlockDate, modalize } from '../utils'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import { useModal } from '../providers/ModalProvider'
import Link from 'next/link'

interface WithLoaded {
  loaded: boolean
}

const Wrapper = styled.div<WithLoaded>`
  ${({ theme, loaded }) => css`
    height: auto;
    position: relative;
    width: 100%;
    display: block;
    position: relative;
    background-color: primary20;
    padding: 6;
    p {
      color: 'black';
    }
    a.permalink {
      color: 'primary';
    }
    p a,
    .meta {
      color: primary;
      display: flex;
      justify-content: space-between;
    }
  `}
`

const TextWrapper = styled.div`
  margin: 0px;
  padding: 0;
  width: auto;
`

interface PartnerPopupType extends Omit<PartnerType, 'place'> {
  related?: any[]
  place?: PlaceType[]
}

interface PartnerBlockProps {
  content: PartnerPopupType
  index: number
}

export const PartnerBlock = ({ content, index }: PartnerBlockProps) => {
  const { title, type, _updatedAt, _createdAt, link, related, place, _id } =
    content

  console.log('PARTNER CONTENT', content)

  const { addModals, insertModal } = useModal()
  const curClient = getClient(false)

  const [loaded, setLoaded] = React.useState(false)

  const handleItemClick = async (item) => {
    const doc = await curClient.fetch(
      `*[_id == "${item._id}"][0]{
        _type == 'person' => {
          ...,
          'title': name
        },
        ...,
        'related': *[_type != 'home' && _type != 'popups' && references(^._id)]{ title, _type, _id, slug }
      }
      `,
    )
    console.log('DOC', doc)
    insertModal(modalize(doc))
  }

  React.useEffect(() => {
    setTimeout(function () {
      setLoaded(true)
    }, 3000)
  }, [])

  return (
    <Wrapper loaded={loaded}>
      <x.h2 fontSize={18} mb={0}>
        {title}
      </x.h2>
      <x.p className="meta">{type == 'default' ? 'publisher' : type}</x.p>

      {place && place.length > 0 ? (
        <x.div pt={4}>
          {place.map((place) => (
            <x.a
              key={place._id}
              pt={1}
              display={'inline-block'}
              textDecoration={'underline'}
              color={'secondary'}
              onClick={() => handleItemClick(place)}
            >
              <x.p key={place._id}>{place.name}</x.p>
            </x.a>
          ))}
        </x.div>
      ) : null}

      {related && (
        <x.ul pt={4}>
          {related.map((doc) => (
            <li key={doc._id}>
              <x.a
                pt={1}
                display={'inline-block'}
                textDecoration={'underline'}
                color={'primary'}
                onClick={() => handleItemClick(doc)}
              >
                {doc.title}
              </x.a>
            </li>
          ))}
        </x.ul>
      )}

      {link && (
        <x.a
          pt={4}
          display={'inline-block'}
          textDecoration={'underline'}
          color={'primary'}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Link
        </x.a>
      )}
    </Wrapper>
  )
}
