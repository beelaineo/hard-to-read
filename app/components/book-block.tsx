import * as React from 'react'
import ReactDOM from 'react-dom'
import styled, { css, x } from '@xstyled/styled-components'
import { Book as BookType, SanityImage } from '../interfaces'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { postBlockDate, modalize } from '../utils'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import { useModal } from '../providers/ModalProvider'
import Link from 'next/link'

interface WithLoaded {
  loaded: boolean
  color?: string
}

const Wrapper = styled.div<WithLoaded>`
  ${({ theme, loaded, color }) => css`
    min-height: 300px;
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: ${color?.replace('1.0', '0.05') || 'secondary10'};
    padding: 6;
    border-color: 'primary';
    text-align: center;
    color: ${color ? color : 'primary'};
    h2 {
      font-size: 1em;
      margin-top: 1.5em;
      margin-bottom: 1em;
    }
    p a,
    .meta {
      color: primary;
      display: flex;
      justify-content: space-between;
    }
    h2 {
      color: ${color ? color : 'primary'};
    }
  `}
`

const TextWrapper = styled.div`
  margin: 0px;
  padding: 0;
  width: auto;
`

interface BookBlockProps {
  content: BookType
  color?: string
}

export const BookBlock = ({ content, color }: BookBlockProps) => {
  const { addModals } = useModal()
  const curClient = getClient(false)

  const [loaded, setLoaded] = React.useState(false)

  const handleItemClick = (doc) => {
    addModals([modalize(doc)])
  }

  // TO-DO: add author refs and wrap authors in links to person block
  // const handleAuthorClick = async (value) => {
  //   const doc = await curClient.fetch(
  //     `*[_id == "${value.reference._ref}"][0]{
  //       _type == 'person' => {
  //         ...,
  //         'title': name
  //       },
  //       'related': *[_type != 'home' && _type != 'popups' && references(^._id)]{ title, _type, _id, slug, ... }
  //     }
  //     `,
  //   )
  //   addModals([modalize(doc)])
  // }

  React.useEffect(() => {
    setTimeout(function () {
      setLoaded(true)
    }, 3000)
  }, [])

  return (
    <Wrapper loaded={loaded} color={color}>
      <x.h2 mb={0}>{content.title}</x.h2>
      <x.p>{content.author}</x.p>
      {content.link && (
        <x.a
          pt={1}
          display={'block'}
          textDecoration={'underline'}
          position={'absolute'}
          bottom={'1em'}
          right={'0'}
          left={'0'}
          href={content.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Link
        </x.a>
      )}
    </Wrapper>
  )
}
