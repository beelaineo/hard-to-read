import type { NextPage } from 'next'
import Head from 'next/head'
import Container from '../../components/container'
import Layout from '../../components/layout'
import Post from '../../components/blog-post'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { blogQuery } from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'

export default function Index({ allPosts, preview }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Blog</title>
        </Head>
        <Container>
          {allPosts.map(post => (
            <Post key={post.slug} post={post}/>
          )
          )}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = overlayDrafts(await getClient(preview).fetch(blogQuery))
  return {
    props: { allPosts, preview },
  }
}