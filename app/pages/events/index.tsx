import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Container from '../../components/container'
import Layout from '../../components/layout'
import Post from '../../components/blog-post'
import Image from 'next/image'
import Link from 'next/link'
import { eventQuery, siteQuery } from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import { x, defaultTheme } from '@xstyled/styled-components'

const Events = ({ eventDocs, siteData, preview }) => {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Events</title>
        </Head>
        <x.div px={3}>
          {eventDocs.map((post) => {
            return (
              <div key={post._id}>
                <Link href={`/events/${post.slug}`}>
                  <a>
                    {post.title} - {post.date}
                  </a>
                </Link>
              </div>
            )
          })}
        </x.div>
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
