import * as React from 'react'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'
import { getImageDimensions } from '@sanity/asset-utils'
import createImageUrlBuilder from '@sanity/image-url'
import { sanityConfig } from '../lib/config'
import styled, { x, css } from '@xstyled/styled-components'
import Image from 'next/image'
import Link from 'next/link'

const imageBuilder = createImageUrlBuilder(sanityConfig)

const SampleImageComponent = ({ value, isInline }) => {
  const { width, height } = getImageDimensions(value)
  return (
    <x.div h={'auto'} w={'100%'} maxW={'100%'} position={'relative'}>
      <Image
        src={imageBuilder
          .image(value)
          .width(800)
          .fit('max')
          .auto('format')
          .url()}
        alt={value.alt || ' '}
        loading="lazy"
        width={width}
        height={height}
      />
    </x.div>
  )
}

const serializers: PortableTextComponents = {
  types: {
    image: SampleImageComponent,
    //@ts-ignore
    youtube: ({ value }) => {
      console.log('VALUE', value)
      const { url, time, key } = value
      const id = getYouTubeId(url)
      const opts = { playerVars: { start: time || 0 } }
      if (id) return <YouTube key={key} videoId={id} opts={opts} />
    },
  },
  marks: {
    internalLink: ({ value, children }) => {
      const { slug = {}, type } = value
      const href =
        type == 'book'
          ? `/books/${slug.current}`
          : type == 'bookCollection'
          ? `/collections/${slug.current}`
          : type == 'event'
          ? `/events/${slug.current}`
          : type == 'partner'
          ? `/partners/${slug.current}`
          : type == 'person'
          ? `/people/${slug.current}`
          : type == 'place'
          ? `/places/${slug.current}`
          : type == 'post'
          ? `/blog/${slug.current}`
          : type == 'theme'
          ? `/themes/${slug.current}`
          : type
      return (
        <Link href={href}>
          <x.a textDecoration={'underline'}>{children}</x.a>
        </Link>
      )
    },
    link: ({ value, children }) => {
      const target = (value.href || '').startsWith('http')
        ? '_blank'
        : undefined
      return (
        <x.a href={value.href} target={target} textDecoration={'underline'}>
          {children}
        </x.a>
      )
    },
  },
}

const Wrapper = styled.div`
  ${({ theme }) => css`
    margin: 0 auto;
    font-size: lg;
    line-height: 1.33;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.1;
    }

    p {
      margin: 4 0;
      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }

    ul {
      margin: 2 6;
      list-style-type: '- ';
      list-style-position: outside;
    }
    blockquote {
      margin: 4 6;
      background-color: ${theme.colors.primary.replace('1.0', '0.1')};
      padding: 6;
      font-style: italic;
      border-left: 4px solid ${theme.colors.primary};
    }

    img,
    iframe {
      margin: 6 0;
    }
  `}
`

export default function PostBody({ content }) {
  return (
    <Wrapper>
      <PortableText value={content} components={serializers} />
    </Wrapper>
  )
}
