import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import { SITE_NAME } from '../../lib/constants'
import {
  personSlugsQuery,
  personBySlugQuery,
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

const Person = ({ data, preview }) => {
  const router = useRouter()
  const slug = data?.personDoc?.slug
  const { addModals } = useModal()

  const {
    data: { personDoc, siteData },
  } = usePreviewSubscription(personBySlugQuery, {
    params: { slug },
    initialData: data,
    enabled: preview && slug,
  })

  useEffect(() => {
    addModals([modalize(data.personDoc)])
  }, [])

  return (
    <Layout preview={preview}>
      <NextSeo
        title={`${data.personDoc.title} | Hard to Read`}
        openGraph={{
          url: `https://hardtoread.us/people/${data.personDoc.slug}`,
          title: data.personDoc.title,
        }}
      />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const [personDoc, siteData] = await Promise.all([
    await getClient(preview).fetch(personBySlugQuery, {
      slug: params?.slug,
    }),
    await getClient(preview).fetch(siteQuery),
  ])

  return {
    props: {
      preview,
      data: {
        personDoc,
        siteData,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await sanityClient.fetch(personSlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export default Person
