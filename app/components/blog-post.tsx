import Head from 'next/head'
import Container from './container'
import PostBody from './post-body'
import PostHeader from './post-header'
import { Post as PostType } from '../interfaces'
import { urlForImage, usePreviewSubscription } from '../lib/sanity'
import { sanityClient, getClient, overlayDrafts } from '../lib/sanity.server'
import * as React from 'react'
import styled, { x, css } from '@xstyled/styled-components'
import Link from 'next/link'

interface PostProps {
  post: PostType
}

export default function Post({ post }: PostProps) {
  return (
    <x.article maxW={800} my={4}>
      <PostHeader
        title={post.title}
        date={post.publishedAt || post._createdAt}
        program={post.post_program}
      />
      <PostBody content={post.body} program={post.post_program} />
      <Link href={'/blog/' + post.slug} legacyBehavior>
        <x.a
          textDecoration={'underline'}
          display={'inline-block'}
          my={4}
          color={post.post_program == 'pillowtalk' ? 'secondary' : 'primary'}
          fontSize={12}
        >
          (permalink)
        </x.a>
      </Link>
    </x.article>
  )
}
