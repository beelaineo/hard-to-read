import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import { SITE_NAME } from '../../lib/constants'
import { bookSlugsQuery, bookBySlugQuery, siteQuery } from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { sanityClient, getClient, overlayDrafts } from '../../lib/sanity.server'
import { GetStaticPaths, GetStaticProps } from 'next'
import { x } from '@xstyled/styled-components'
import { useModal } from '../../providers/ModalProvider'
import { Modal } from '../../interfaces'
import { modalize } from '../../utils'
import { NextSeo } from 'next-seo'

const { useEffect } = React

const Book = ({ data, preview }) => {
  const router = useRouter()
  const slug = data?.bookDoc?.slug
  const { addModals } = useModal()

  const {
    data: { bookDoc, siteData },
  } = usePreviewSubscription(bookBySlugQuery, {
    params: { slug },
    initialData: data,
    enabled: preview && slug,
  })

  useEffect(() => {
    addModals([modalize(data.bookDoc)])
  }, [])

  return (
    <Layout preview={preview}>
      <NextSeo
        title={`${bookDoc.title} | Hard to Read`}
        description={siteData.description}
        openGraph={{
          url: `https://hardtoread.us/blog/${bookDoc.slug}`,
          title: bookDoc.title,
          type: 'book',
          book: {
            releaseDate: bookDoc.date,
            authors: [bookDoc.author],
          },
        }}
      />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const [bookDoc, siteData] = await Promise.all([
    await getClient(preview).fetch(bookBySlugQuery, {
      slug: params?.slug,
    }),
    await getClient(preview).fetch(siteQuery),
  ])

  return {
    props: {
      preview,
      data: {
        bookDoc,
        siteData,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await sanityClient.fetch(bookSlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export default Book
