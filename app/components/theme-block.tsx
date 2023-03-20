import * as React from 'react'
import ReactDOM from 'react-dom'
import styled, { css, x } from '@xstyled/styled-components'
import { Theme as ThemeType, SanityImage } from '../interfaces'
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
    height: auto;
    position: relative;
    max-width: 100%;
    display: block;
    position: relative;
    background-color: ${color ? color.replace('1.0', '0.2') : 'primary20'};
    padding: 6;
    h2 {
      white-space: wrap;
      color: ${color};
    }
    p {
      color: ${color};
    }
    a.permalink {
      color: ${color};
    }
    p a,
    .meta {
      color: ${color};
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

interface ThemePopupType extends ThemeType {
  related?: any[]
}

interface ThemeBlockProps {
  content: ThemePopupType
  color?: string
}

export const ThemeBlock = ({ content, color }: ThemeBlockProps) => {
  const { addModals } = useModal()
  const curClient = getClient(false)

  const [loaded, setLoaded] = React.useState(false)

  const handleItemClick = (doc) => {
    addModals([modalize(doc)])
  }

  React.useEffect(() => {
    setTimeout(function () {
      setLoaded(true)
    }, 3000)
  }, [])

  return (
    <Wrapper loaded={loaded} color={color}>
      <x.h2 mb={0}>{content.title}</x.h2>

      {content.related && (
        <x.ul pt={4}>
          {content.related.map((doc) => (
            <li key={doc._id}>
              <x.a
                pt={1}
                display={'inline-block'}
                textDecoration={'underline'}
                color={color}
                onClick={() => handleItemClick(doc)}
              >
                {doc.title}
              </x.a>
            </li>
          ))}
        </x.ul>
      )}
      <Link href={'/themes/' + content.slug} legacyBehavior>
        <x.a
          textDecoration={'underline'}
          display={'inline-block'}
          my={4}
          fontSize={12}
        >
          (permalink)
        </x.a>
      </Link>
    </Wrapper>
  )
}
