import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PostBody from '../../components/post-body'
import MoreStories from '../../components/more-stories'
import PostHeader from '../../components/post-header'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import { SITE_NAME } from '../../lib/constants'
import { eventSlugsQuery, eventBySlugQuery, siteQuery } from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { sanityClient, getClient, overlayDrafts } from '../../lib/sanity.server'
import { GetStaticPaths, GetStaticProps } from 'next'
import { x } from '@xstyled/styled-components'
import { useModal } from '../../providers/ModalProvider'
import { Modal } from '../../interfaces'

const { useEffect } = React

const Event = ({ data, preview }) => {
  const router = useRouter()
  const slug = data?.eventDoc?.slug
  const { addModals } = useModal()

  const {
    data: { eventDoc, siteData },
  } = usePreviewSubscription(eventBySlugQuery, {
    params: { slug },
    initialData: data,
    enabled: preview && slug,
  })

  useEffect(() => {
    const modalize = (doc: any) => {
      const modalDoc: Modal = {
        id: doc._id,
        type: 'event',
        content: doc,
      }
      return modalDoc
    }
    addModals([modalize(data.eventDoc)])
  }, [])

  return (
    <Layout preview={preview}>
      <x.div>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : eventDoc ? (
          <>
            <article>
              <Head>
                <title>
                  {eventDoc.title} | {SITE_NAME}
                </title>
              </Head>
              <PostHeader title={eventDoc.title} date={eventDoc.date} />
              <PostBody content={eventDoc.body} />
            </article>
            <SectionSeparator />
          </>
        ) : null}
      </x.div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const [eventDoc, siteData] = await Promise.all([
    await getClient(preview).fetch(eventBySlugQuery, {
      slug: params?.slug,
    }),
    await getClient(preview).fetch(siteQuery),
  ])

  return {
    props: {
      preview,
      data: {
        eventDoc,
        siteData,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await sanityClient.fetch(eventSlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export default Event
