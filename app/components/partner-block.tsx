import * as React from 'react'
import ReactDOM from 'react-dom'
import styled, { css, x } from '@xstyled/styled-components'
import { Partner as PartnerType, SanityImage } from '../interfaces'
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

interface PartnerPopupType extends PartnerType {
  related?: any[]
}

interface PartnerBlockProps {
  content: PartnerPopupType
}

export const PartnerBlock = ({ content }: PartnerBlockProps) => {
  const { title, type, _updatedAt, _createdAt, link, related, _id } = content

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

  console.log('Partner Popup: ', content)

  return (
    <Wrapper loaded={loaded}>
      <x.h2 fontSize={18} mb={0}>
        {title}
      </x.h2>
      <x.p className="meta">{type}</x.p>
      {link && (
        <x.a
          pt={1}
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

      {related && (
        <x.ul>
          {related.map((doc) => (
            <li key={doc._id}>
              <x.a
                pt={4}
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
    </Wrapper>
  )
}
