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

interface WithLoaded {
  loaded: boolean
}

const Wrapper = styled.div<WithLoaded>`
  ${({ loaded }) => css`
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
  content: PostType
  index: number
}

export const ImageBlock = ({ value }) => {
  console.log('image block', value)
  const { related, caption, alt } = value

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
}

export const PostBlock = ({ content, index }: PostBlockProps) => {
  const {
    title,
    slug,
    publishedAt,
    _updatedAt,
    _createdAt,
    body,
    post_program,
    themes,
    _id,
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
    types: {
      image: ImageBlock,
      // image: ({ value }) => {
      //   return (
      //     <ImageComponent
      //       image={value}
      //       caption={value.caption}
      //       alt={value.alt}
      //     />
      //   )
      // },
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
              ...,
              "related": *[_type != 'home' && _type != 'popups' && references(^._id)]{ title, _type, _id, slug, ... }
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
    <Wrapper loaded={loaded}>
      <h2>{title}</h2>
      <p>{postBlockDate(publishedAt)}</p>
      <TextWrapper>
        {body ? (
          <PortableText value={body[0]} components={ptComponents} />
        ) : null}
      </TextWrapper>
      <Link href={`/blog/${slug?.current}`} legacyBehavior>
        <x.a
          pt={4}
          display={'inline-block'}
          textDecoration={'underline'}
          color={'primary'}
          fontSize={12}
        >
          Read more...
        </x.a>
      </Link>
    </Wrapper>
  )
}
