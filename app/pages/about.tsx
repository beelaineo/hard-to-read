import * as React from 'react'
import Layout from '../components/layout'
import { GetStaticProps, GetStaticPaths } from 'next'
import styled, { x, css } from '@xstyled/styled-components'
import { definitely, modalize } from '../utils'
import { siteQuery, pressQuery } from '../lib/queries'
import { getClient, overlayDrafts, sanityClient } from '../lib/sanity.server'
import { useModal } from '../providers/ModalProvider'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { NextSeo } from 'next-seo'
import { getImageDimensions } from '@sanity/asset-utils'
import createImageUrlBuilder from '@sanity/image-url'
import { sanityConfig } from '../lib/config'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'
import Link from 'next/link'
import Image from 'next/image'

const { useEffect, useState, useRef } = React

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  @media (max-width: lg) {
    grid-template-columns: 1fr;
  }
`

const PressToggleWrapper = styled.div`
  grid-column: span 4 / 8;
`

const PressWrapper = styled.div`
  grid-column: span 10;
`

const PortableTextWrapper = styled.div`
  font-size: 1.25rem;
  grid-column: span 4 / 8;
  p {
    margin-bottom: 6;
  }
  a {
    border-bottom: 2px;
    border-style: solid;
    border-color: primary;
  }
`

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const [siteData] = await Promise.all([
    await getClient(preview).fetch(siteQuery),
  ])
  return {
    props: { siteData, preview },
  }
}

const imageBuilder = createImageUrlBuilder(sanityConfig)

const ImageComponent = ({ value, isInline }) => {
  const { width, height } = getImageDimensions(value)
  return (
    <x.figure h={'auto'} w={'100%'} maxW={'100%'} position={'relative'}>
      <Image
        src={imageBuilder
          .image(value)
          .width(800)
          .fit('max')
          .auto('format')
          .url()}
        alt={
          value.alt ||
          value.caption ||
          'Inline image in body text from Hard to Read'
        }
        loading="lazy"
        width={width}
        height={height}
      />
      {value?.caption && (
        <x.figcaption color={'secondary'} fontSize={16}>
          {value.caption}
        </x.figcaption>
      )}
    </x.figure>
  )
}

const serializers: PortableTextComponents = {
  types: {
    image: ImageComponent,
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
      return (
        <Link href={href}>
          <x.a display={'inline-block'}>{children}</x.a>
        </Link>
      )
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

const About = ({ siteData, preview }) => {
  return (
    <>
      <Layout preview={preview}>
        <NextSeo
          title="About | Hard to Read"
          description={siteData.description}
          openGraph={{
            url: 'https://hardtoread.us/about',
            title: 'About',
            description: siteData.description,
          }}
        />
        <Grid>
          <PortableTextWrapper>
            <PortableText value={siteData.about} components={serializers} />
          </PortableTextWrapper>
        </Grid>
      </Layout>
    </>
  )
}

export default About
