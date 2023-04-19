import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import { SITE_NAME } from '../../lib/constants'
import {
  exhibitionSlugsQuery,
  exhibitionBySlugQuery,
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

const Exhibition = ({ data, preview }) => {
  const router = useRouter()
  const slug = data?.eventDoc?.slug
  const { addModals } = useModal()

  const defaults = { nonTextBehavior: 'remove' }

  const blocksToText = (blocks, opts = {}) => {
    const options = Object.assign({}, defaults, opts)
    return blocks
      .map((block) => {
        if (block._type !== 'block' || !block.children) {
          return options.nonTextBehavior === 'remove'
            ? ''
            : `[${block._type} block]`
        }

        return block.children.map((child) => child.text).join('')
      })
      .join('\n\n')
  }

  const {
    data: { eventDoc, siteData },
  } = usePreviewSubscription(exhibitionBySlugQuery, {
    params: { slug },
    initialData: data,
    enabled: preview && slug,
  })

  useEffect(() => {
    addModals([modalize(data.eventDoc)])
  }, [])

  return (
    <Layout preview={preview}>
      <NextSeo
        title={`${eventDoc.title} | Hard to Read`}
        description={blocksToText(eventDoc.text)}
        openGraph={{
          url: `https://hardtoread.us/exhibitions/${eventDoc.slug}`,
          title: eventDoc.title,
          description: blocksToText(eventDoc.text),
          ...(eventDoc.coverImage?.url && {
            images: [
              {
                url: urlForImage(eventDoc.coverImage.url)
                  .width(850)
                  .height(650)
                  .fit('crop')
                  .crop('focalpoint')
                  .focalPoint(
                    eventDoc.coverImageHotspot?.x || 0.5,
                    eventDoc.coverImageHotspot?.y || 0.5,
                  )
                  .url(),
                width: 850,
                height: 650,
                alt: eventDoc.title,
              },
            ],
          }),
        }}
      />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const [eventDoc, siteData] = await Promise.all([
    await getClient(preview).fetch(exhibitionBySlugQuery, {
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
  const paths = await sanityClient.fetch(exhibitionSlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export default Exhibition
