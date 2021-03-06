import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout'
import { eventQuery, siteQuery } from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import { x, defaultTheme } from '@xstyled/styled-components'
import { EventListing } from '../../components/event-listing'

const Events = ({ eventDocs, siteData, preview }) => {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Events</title>
        </Head>
        <x.div px={0} display={'grid'} gridTemplateColumns={'1'} rowGap={4}>
          {eventDocs.map((post) => (
            <EventListing key={post._id} post={post} />
          ))}
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
