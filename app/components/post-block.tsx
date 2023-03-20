import * as React from 'react'
import ReactDOM from 'react-dom'
import styled, { css, x } from '@xstyled/styled-components'
import { Post as PostType, SanityImage, SanityImageAsset } from '../interfaces'
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

const TextWrapper = styled.div`
  margin: 0px;
  padding: 0;
  width: auto;
`

interface PostBlockProps {
  content: PostType
}

interface SanityImageProps {
  asset: SanityImage
  caption?: string
  alt?: string
}

export const PostBlock = ({ content }: PostBlockProps) => {
  const {
    title,
    slug,
    publishedAt,
    _updatedAt,
    _createdAt,
    body,
    themes,
    _id,
  } = content
  const { addModals } = useModal()
  const curClient = getClient(false)

  const [loaded, setLoaded] = React.useState(false)

  // const ImageComponent = ({ image, caption, alt }: SanityImageProps) => {
  //   const imgProps: UseNextSanityImageProps = useNextSanityImage(
  //     sanityClient,
  //     image,
  //   )
  //   console.log('CONTENT', image)
  //   const { assetId, metadata, originalFilename, uploadId, url } = image.asset
  //   const width = metadata?.dimensions.width
  //   const height = metadata?.dimensions.height
  //   const ratio = metadata?.dimensions.aspectRatio

  //   return (
  //     <x.figure h={'auto'} w={'100%'} maxW={'100%'} position={'relative'}>
  //       <Img
  //         {...imgProps}
  //         sizes="(max-width: 767px) 100vw, 40vw"
  //         alt={alt || caption || 'Inline image in body text from Hard to Read'}
  //         loading="lazy"
  //         placeholder={'blur'}
  //         style={{ width: '100%', height: 'auto' }}
  //         blurDataURL={metadata.lqip}
  //         width={width}
  //         height={height}
  //       />
  //       {caption && (
  //         <x.figcaption color={'secondary'} fontSize={16}>
  //           {caption}
  //         </x.figcaption>
  //       )}
  //     </x.figure>
  //   )
  // }

  React.useEffect(() => {
    setTimeout(function () {
      setLoaded(true)
    }, 3000)
  }, [])

  const ptComponents: PortableTextComponents = {
    types: {
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
            `*[_id == "${value.reference._ref}"][0]`,
          )
          addModals([modalize(doc)])
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
