import Head from 'next/head'
import Container from './container'
import PostBody from './post-body'
import PostHeader from './post-header'
import { urlForImage, usePreviewSubscription } from '../lib/sanity'
import { sanityClient, getClient, overlayDrafts } from '../lib/sanity.server'

export default function Post({ post }) {
  return (
    <Container>
      <article>
        <PostHeader title={post.title} date={post.publishedAt} />
        <PostBody content={post.body} />
      </article>
    </Container>
  )
}
