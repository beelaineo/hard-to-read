import * as React from 'react'
import ReactDOM from 'react-dom'
import styled, { css, x } from '@xstyled/styled-components'
import { Place as PlaceType } from '../interfaces'
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
      color: ${loaded ? 'black' : 'primary0'};
      transition: color 10s ease-in-out;
    }
    a.permalink {
      color: ${loaded ? 'primary' : 'primary0'};
      transition: color 10s ease-in-out;
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
interface PlacePopupType extends PlaceType {
  related?: any[]
}

interface PlaceBlockProps {
  content: PlacePopupType
  index: number
}

export const PlaceBlock = ({ content, index }: PlaceBlockProps) => {
  const { addModals, insertModal } = useModal()
  const curClient = getClient(false)
  console.log('PLACE', content)

  const [loaded, setLoaded] = React.useState(false)

  const handleItemClick = (doc) => {
    insertModal(modalize(doc), index)
  }

  React.useEffect(() => {
    setTimeout(function () {
      setLoaded(true)
    }, 3000)
  }, [])

  return (
    <Wrapper loaded={loaded}>
      <x.h2 mb={0}>{content.name}</x.h2>
      {content.link && (
        <x.a
          pt={1}
          display={'inline-block'}
          textDecoration={'underline'}
          color={'primary'}
          href={content.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Link
        </x.a>
      )}
      <x.div pt={4}>
        {content.address && <x.div pt={1}>{content.address}</x.div>}
        {content.city && <x.div pt={1}>{content.city}</x.div>}
      </x.div>

      {content.related && (
        <x.ul pt={4}>
          {content.related.map((doc) => (
            <li key={doc._id}>
              <x.a
                pt={1}
                display={'inline-block'}
                textDecoration={'underline'}
                color={'secondary'}
                onClick={() => handleItemClick(doc)}
              >
                {doc.title}
              </x.a>
            </li>
          ))}
        </x.ul>
      )}
      <Link href={'/places/' + content.slug?.current} legacyBehavior>
        <x.a
          textDecoration={'underline'}
          display={'inline-block'}
          my={4}
          color={'primary'}
          fontSize={12}
        >
          (permalink)
        </x.a>
      </Link>
    </Wrapper>
  )
}
