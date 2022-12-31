import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import { SITE_NAME } from '../../lib/constants'
import {
  placeSlugsQuery,
  placeBySlugQuery,
  placeQuery,
  siteQuery,
} from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { sanityClient, getClient, overlayDrafts } from '../../lib/sanity.server'
import { GetStaticPaths, GetStaticProps } from 'next'
import { x } from '@xstyled/styled-components'
import { useModal } from '../../providers/ModalProvider'
import { Modal } from '../../interfaces'
import { modalize } from '../../utils'
import { NextSeo } from 'next-seo'

const { useEffect } = React

const Place = ({ data, preview }) => {
  const router = useRouter()
  const slug = data?.placeDoc?.slug
  const { addModals } = useModal()

  const {
    data: { placeDoc, siteData },
  } = usePreviewSubscription(placeBySlugQuery, {
    params: { slug },
    initialData: data,
    enabled: preview && slug,
  })

  useEffect(() => {
    addModals([modalize(data.placeDoc)])
  }, [])

  return (
    <Layout preview={preview}>
      <NextSeo
        title={`${data.placeDoc.title} | Hard to Read`}
        openGraph={{
          url: `https://hardtoread.us/places/${data.placeDoc.slug}`,
          title: data.placeDoc.title,
        }}
      />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const [placeDoc, siteData] = await Promise.all([
    await getClient(preview).fetch(placeBySlugQuery, {
      slug: params?.slug,
    }),
    await getClient(preview).fetch(siteQuery),
  ])

  return {
    props: {
      preview,
      data: {
        placeDoc,
        siteData,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await sanityClient.fetch(placeSlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export default Place
