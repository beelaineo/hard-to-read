import * as React from 'react'
import ReactDOM from 'react-dom'
import styled, { css, x } from '@xstyled/styled-components'
import { Post as PostType, SanityImageAsset } from '../interfaces'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import createImageUrlBuilder from '@sanity/image-url'
import { getImageDimensions } from '@sanity/asset-utils'
import { postBlockDate, modalize } from '../utils'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'
import { getClient, overlayDrafts, sanityClient } from '../lib/sanity.server'
import { useModal } from '../providers/ModalProvider'
import Link from 'next/link'
import Img from 'next/image'
import { sanityConfig } from '../lib/config'
import { useNextSanityImage, UseNextSanityImageProps } from 'next-sanity-image'
import SanityImage from './sanity-image'
import { modalFetchFields } from '../lib/queries'

interface WithLoaded {
  loaded: boolean
  color?: string
}

const Wrapper = styled.div<WithLoaded>`
  ${({ loaded, color }) => css`
    height: auto;
    position: relative;
    width: 100%;
    display: block;
    position: relative;
    background-color: ${color == 'pillowtalk' ? 'secondary20' : 'primary20'};
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

const ImageWrapper = styled.div`
  position: relative;
`

const TextWrapper = styled.div`
  margin: 0px;
  padding: 0;
  width: auto;
`

interface PostBlockProps {
  content: any
  color?: string
  index: number
}

export const TextAttachmentBlock = ({
  content,
  color,
  index,
}: PostBlockProps) => {
  const { title, body } = content
  const { addModals, insertModal } = useModal()
  const curClient = getClient(false)

  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    setTimeout(function () {
      setLoaded(true)
    }, 3000)
  }, [])

  const ptComponents: PortableTextComponents = {
    types: {
      image: ({ value }) => {
        const { caption, alt, crop, hotspot, asset } = value
        return (
          <ImageWrapper>
            <SanityImage image={value.asset} caption={caption} alt={alt} />
            {caption && (
              <x.figcaption
                position={'absolute'}
                color={'white'}
                px={2}
                py={3}
                w={'100%'}
                bottom={0}
                fontSize={12}
              >
                {caption}
              </x.figcaption>
            )}
          </ImageWrapper>
        )
      },
      //@ts-ignore
      youtube: ({ value }) => {
        const { url, time, key } = value
        const id = getYouTubeId(url)
        const opts = { playerVars: { start: time || 0 } }
        if (id) return <YouTube key={key} videoId={id} opts={opts} />
      },
    },
    marks: {
      internalLink: ({ children, value }) => {
        const handleItemClick = async (value) => {
          const doc = await curClient.fetch(
            `*[_id == "${value.reference._ref}"][0] {
              ${modalFetchFields}
            }`,
          )
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
            textDecoration={'underline'}
            zIndex={1}
            color={'secondary'}
            target="_blank"
            href={value.href}
          >
            {children}
          </x.a>
        )
      },
    },
  }

  return (
    <Wrapper loaded={loaded} color={color}>
      <h2>{title}</h2>
      <TextWrapper>
        {body ? <PortableText value={body} components={ptComponents} /> : null}
      </TextWrapper>
    </Wrapper>
  )
}