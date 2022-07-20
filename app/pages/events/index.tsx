import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Container from '../../components/container'
import Layout from '../../components/layout'
import Post from '../../components/blog-post'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { eventQuery, siteQuery } from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'

const Events = ({ eventDocs, siteData, preview }) => {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Events</title>
        </Head>
        <Container>
          {eventDocs.map((post) => (
            <div>
              {post.title} - {post.date}
            </div>
          ))}
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const [eventDocs, siteData] = await Promise.all([
    overlayDrafts(await getClient(preview).fetch(eventQuery)),
    await getClient(preview).fetch(siteQuery),
  ])
  return {
    props: { eventDocs, siteData, preview },
  }
}

export default Events
