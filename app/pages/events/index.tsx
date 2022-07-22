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
import { Modal } from '../../interfaces'
import { useModal } from '../../providers/ModalProvider'
import { modalize } from '../../utils'

// title,
// date,
// end_date,
// start,
// end,
// timezone,
// event_type,
// event_program,
// text,
// action_label,
// action_link,
// texts,
// images,
// videos,
// links,
// place,
// themes,
// persons,

const Events = ({ eventDocs, siteData, preview }) => {
  const { addModals } = useModal()

  const handleItemClick = (post) => {
    addModals([modalize(post)])
  }

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Events</title>
        </Head>
        <x.div px={3}>
          {eventDocs.map((post) => {
            return (
              <x.div key={post._id}>
                {/* <Link href={`/events/${post.slug}`}> */}
                <x.a
                  display={'grid'}
                  gridTemplateColumns={'10'}
                  onClick={() => handleItemClick(post)}
                >
                  <x.div gridColumn={'span 3'}>{post.title}</x.div>
                  <x.div gridColumn={'span 1'}>{post.date}</x.div>
                  <x.div>{post.title}</x.div>
                </x.a>
                {/* </Link> */}
              </x.div>
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
