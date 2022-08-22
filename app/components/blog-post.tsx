import Head from 'next/head'
import Container from './container'
import PostBody from './post-body'
import PostHeader from './post-header'
import { urlForImage, usePreviewSubscription } from '../lib/sanity'
import { sanityClient, getClient, overlayDrafts } from '../lib/sanity.server'
import * as React from 'react'
import styled, { x, css } from '@xstyled/styled-components'
import Link from 'next/link'

export default function Post({ post }) {
  console.log(post)
  return (
    <x.article maxW={800} my={4}>
      <PostHeader
        title={post.title}
        date={post.publishedAt || post._createdAt}
      />
      <PostBody content={post.body} />
      <Link href={'/blog/' + post.slug}>
        <x.a
          textDecoration={'underline'}
          display={'inline-block'}
          my={4}
          color={'primary'}
        >
          (permalink)
        </x.a>
      </Link>
    </x.article>
  )
}
