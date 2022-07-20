import type { NextPage } from 'next'
import Head from 'next/head'
import Container from '../components/container'
import Layout from '../components/layout'

import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { indexQuery } from '../lib/queries'
import { getClient, overlayDrafts } from '../lib/sanity.server'

export default function Index({ allPosts, preview }) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Hard to Read</title>
        </Head>
        <Container>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery))
  return {
    props: { allPosts, preview },
  }
}