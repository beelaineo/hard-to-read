import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Container from '../../components/container'
import Layout from '../../components/layout'
import Post from '../../components/blog-post'
import Image from 'next/image'
import { blogQuery, siteQuery } from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import * as React from 'react'
import { x } from '@xstyled/styled-components'

export default function Index({ allPosts, preview }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Blog</title>
        </Head>
        <Container>
          {allPosts.map((post, i) => (
            <>
              {i > 0 ? (
                <x.hr
                  my={12}
                  h={'2px'}
                  maxW={800}
                  backgroundColor={'primary'}
                />
              ) : null}
              <Post key={post.slug} post={post} />
            </>
          ))}
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const [allPosts, siteData] = await Promise.all([
    overlayDrafts(await getClient(preview).fetch(blogQuery)),
    await getClient(preview).fetch(siteQuery),
  ])
  return {
    props: { allPosts, siteData, preview },
  }
}
