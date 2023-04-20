import * as React from 'react'
import ReactDOM from 'react-dom'
import styled, { css, x } from '@xstyled/styled-components'
import { Person as PersonType, SanityImage } from '../interfaces'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { postBlockDate, modalize, modalizeImage } from '../utils'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import { useModal } from '../providers/ModalProvider'
import Link from 'next/link'
import { modalFetchFields } from '../lib/queries'

interface WithLoaded {
  loaded: boolean
  color?: string
}

const Wrapper = styled.div<WithLoaded>`
  ${({ theme, loaded, color }) => css`
    height: auto;
    position: relative;
    width: 100%;
    display: block;
    position: relative;
    background-color: ${color ? color.replace('1.0', '0.2') : 'primary20'};
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

interface PersonPopupType extends Omit<PersonType, 'name'> {
  related?: any[]
  title?: string
  name?: string
}

interface PersonBlockProps {
  content: PersonPopupType
  color?: string
  index: number
}

export const PersonBlock = ({ content, color, index }: PersonBlockProps) => {
  const { addModals, insertModal } = useModal()
  const curClient = getClient(false)
  console.log('PERSON', content)

  const [loaded, setLoaded] = React.useState(false)

  const handleItemClick = async (item) => {
    const doc = await curClient.fetch(
      `*[_id == "${item._id || item._ref || item.asset._ref}"][0]{
        ${modalFetchFields}
      }
      `,
    )
    if (doc._type == 'sanity.imageAsset') {
      insertModal(modalizeImage(doc), index)
    } else {
      insertModal(modalize(doc), index)
    }
  }

  React.useEffect(() => {
    setTimeout(function () {
      setLoaded(true)
    }, 3000)
  }, [])

  return (
    <Wrapper loaded={loaded} color={color}>
      <x.h2 mb={0}>{content.title || content.name}</x.h2>
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
      <Link href={'/people/' + content.slug?.current} legacyBehavior>
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
