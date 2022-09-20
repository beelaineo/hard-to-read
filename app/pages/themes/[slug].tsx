import * as React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import { themeSlugsQuery, themeBySlugQuery, siteQuery } from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { sanityClient, getClient, overlayDrafts } from '../../lib/sanity.server'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useModal } from '../../providers/ModalProvider'
import { modalize } from '../../utils'
import { NextSeo } from 'next-seo'

const { useEffect } = React

const Theme = ({ data, preview }) => {
  const router = useRouter()
  const slug = data?.themeDoc?.slug
  const { addModals } = useModal()

  const {
    data: { themeDoc, siteData },
  } = usePreviewSubscription(themeBySlugQuery, {
    params: { slug },
    initialData: data,
    enabled: preview && slug,
  })

  useEffect(() => {
    addModals([modalize(data.themeDoc)])
  }, [])

  return (
    <Layout preview={preview}>
      <NextSeo
        title={`${data.themeDoc.title} | Hard to Read`}
        openGraph={{
          url: `https://hardtoread.us/themes/${data.themeDoc.slug}`,
          title: data.themeDoc.title,
        }}
      />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const [themeDoc, siteData] = await Promise.all([
    await getClient(preview).fetch(themeBySlugQuery, {
      slug: params?.slug,
    }),
    await getClient(preview).fetch(siteQuery),
  ])

  return {
    props: {
      preview,
      data: {
        themeDoc,
        siteData,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await sanityClient.fetch(themeSlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export default Theme
