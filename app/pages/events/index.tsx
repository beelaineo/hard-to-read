import * as React from 'react'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import { x, defaultTheme } from '@xstyled/styled-components'
import { EventListing } from '../../components/event-listing'
import { NextSeo } from 'next-seo'

import { eventPopupsQuery, eventQuery, siteQuery } from '../../lib/queries'
import { definitely, modalize } from '../../utils'
import { useModal } from '../../providers/ModalProvider'
const { useEffect } = React

const Events = ({ eventDocs, siteData, popups, preview }) => {
  console.log('EVENT  popups', popups)
  const { addModals } = useModal()

  useEffect(() => {
    if (!popups) return
    const modals = popups.map((m) => modalize(m))
    addModals(modals)
  }, [])

  return (
    <>
      <Layout preview={preview}>
        <NextSeo
          title="Events | Hard to Read"
          openGraph={{
            url: 'https://hardtoread.us/events',
            title: 'Events',
          }}
        />
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
  const [eventDocs, siteData, popups] = await Promise.all([
    overlayDrafts(await getClient(preview).fetch(eventQuery)),
    await getClient(preview).fetch(siteQuery),
    await getClient(preview).fetch(eventPopupsQuery),
  ])
  return {
    props: { eventDocs, siteData, popups, preview },
  }
}

export default Events
