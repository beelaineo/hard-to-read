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
      margin-bottom: 1rem;
    }
  `}
`

const TextWrapper = styled.div`
  margin: 0px;
  padding: 0;
  width: auto;
`

interface PartnerPopupType extends PartnerType {
  relatedDocs?: [Record<string, unknown>]
}

interface PartnerBlockProps {
  content: PartnerPopupType
}

export const PartnerBlock = ({ content }: PartnerBlockProps) => {
  const { title, _updatedAt, _createdAt, link, relatedDocs, _id } = content

  const { addModals } = useModal()
  const curClient = getClient(false)

  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    setTimeout(function () {
      setLoaded(true)
    }, 3000)
  }, [])

  console.log('Partner Popup: ', content)

  return (
    <Wrapper loaded={loaded}>
      {/* <x.p className="meta">
        {postBlockDate(date)}
        {publication && <em>{publication}</em>}
      </x.p> */}
      <x.h2 fontSize={18}>{title}</x.h2>
      {link && (
        <Link href={link}>
          <x.a
            pt={4}
            display={'inline-block'}
            textDecoration={'underline'}
            color={'primary'}
          >
            Link
          </x.a>
        </Link>
      )}
    </Wrapper>
  )
}
