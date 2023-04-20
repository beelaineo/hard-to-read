import * as React from 'react'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'
import { Post as PostType, SanityImageAsset } from '../interfaces'
import { getImageDimensions } from '@sanity/asset-utils'
import createImageUrlBuilder from '@sanity/image-url'
import { sanityConfig } from '../lib/config'
import styled, { x, css, th } from '@xstyled/styled-components'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { themeBySlugQuery } from '../lib/queries'
import { useModal } from '../providers/ModalProvider'
import { modalize } from '../utils'
import { getClient } from '../lib/sanity.server'
import SanityImage from './sanity-image'

// const imageBuilder = createImageUrlBuilder(sanityConfig)

// const ImageComponent = ({ value, isInline }) => {
//   const { width, height } = getImageDimensions(value)
//   return (
//     <x.figure h={'auto'} w={'100%'} maxW={'100%'} position={'relative'}>
//       <Image
//         src={imageBuilder
//           .image(value)
//           .width(800)
//           .fit('max')
//           .auto('format')
//           .url()}
//         alt={
//           value.alt ||
//           value.caption ||
//           'Inline image in body text from Hard to Read'
//         }
//         loading="lazy"
//         width={width}
//         height={height}
//       />
//       {value?.caption && (
//         <x.figcaption color={'secondary'} fontSize={16}>
//           {value.caption}
//         </x.figcaption>
//       )}
//     </x.figure>
//   )
// }

interface WithProgram {
  program: 'hardtoread' | 'pillowtalk'
}

const Wrapper = styled.div<WithProgram>`
  ${({ theme, program }) => css`
    margin: 0 auto;
    font-size: lg;
    line-height: 1.33;
    position: relative;

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
      background-color: ${program == 'hardtoread'
        ? theme.colors.primary10
        : theme.colors.secondary10};
      padding: 6;
      font-style: italic;
      border-left: 4px solid
        ${program == 'hardtoread'
          ? theme.colors.primary
          : theme.colors.secondary};
    }

    strong {
      color: ${program == 'hardtoread'
        ? theme.colors.primary
        : theme.colors.secondary};
    }

    a {
      border-bottom: 2px;
      border-style: solid;
      border-color: ${program == 'hardtoread'
        ? theme.colors.primary
        : theme.colors.secondary};
    }

    img,
    iframe {
      margin: 6 0;
      max-width: 100%;
    }
  `}
`

interface PostBodyProps {
  content: any
  program: 'hardtoread' | 'pillowtalk'
}

export default function PostBody({ content, program }: PostBodyProps) {
  const { addModals, isMobile } = useModal()
  const curClient = getClient(false)

  const serializers: PortableTextComponents = {
    types: {
      image: ({ value }) => {
        const { related, caption, alt } = value
        return (
          <Wrapper program={program}>
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
          </Wrapper>
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
      internalLink: ({ value, children }) => {
        const { slug = {}, type } = value

        const handleItemClick = async (value) => {
          console.log('VALUE on CLICK', value)
          const doc = await curClient.fetch(
            `*[_id == "${value.reference._ref}"][0]{
              _type == 'person' => {
                ...,
                'title': name
              },
              _type == 'event' => @->{
                ..., 
                _id, 
                '_key': ^._key,
                images[]{_key, _type, caption, alt, hotspot, asset->},
                videos[]{_key, asset->},
                persons[] {
                  _key,
                  'person': @-> {
                    ...,
                    'title': name,
                  }
                },
                books[]->,
                place->,
                themes[] {
                  _key,
                  'theme': @->
                },
                texts[]{
                  _key,
                  _type == 'pdfAttachment' => {
                    title,
                    asset->{url,originalFilename}
                  },
                  _type == 'textAttachment' => {
                    title,
                    body
                  }
                },
              },
              ...,
              'related': *[_type != 'home' && _type != 'popups' && references(^._id)]{ title, _type, _id, slug, ... }
            }
            `,
          )
          addModals([modalize(doc)])
        }

        const href =
          type == 'book' && slug?.current
            ? `/books/${slug.current}`
            : type == 'bookCollection' && slug?.current
            ? `/collections/${slug.current}`
            : type == 'event' && slug?.current
            ? `/events/${slug.current}`
            : type == 'partner' && slug?.current
            ? `/partners/${slug.current}`
            : type == 'person' && slug?.current
            ? `/people/${slug.current}`
            : type == 'place' && slug?.current
            ? `/places/${slug.current}`
            : type == 'post' && slug?.current
            ? `/blog/${slug.current}`
            : type == 'theme' && slug?.current
            ? `/themes/${slug.current}`
            : type

        if (isMobile == true) {
          return (
            <Link href={href} legacyBehavior>
              <x.a display={'inline-block'}>{children}</x.a>
            </Link>
          )
        } else {
          return (
            <x.a
              onClick={() => handleItemClick(value)}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {children}
            </x.a>
          )
        }
      },
      link: ({ value, children }) => {
        const target = (value.href || '').startsWith('http')
          ? '_blank'
          : undefined
        return (
          <x.a href={value.href} target={target}>
            {children}
          </x.a>
        )
      },
    },
  }

  return (
    <Wrapper program={program}>
      <PortableText value={content} components={serializers} />
    </Wrapper>
  )
}
