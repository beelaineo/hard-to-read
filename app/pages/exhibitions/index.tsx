import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout'
import { exhibitionQuery, siteQuery } from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import { x, defaultTheme } from '@xstyled/styled-components'
import { useModal } from '../../providers/ModalProvider'
import { modalize } from '../../utils'
import { ExhibitionListing } from '../../components/exhibition-listing'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Exhibitions = ({ exhibitionDocs, siteData, preview }) => {
  const { addModals, resetModals, isMobile } = useModal()
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = () => {
      if (isMobile == true) {
        resetModals()
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.asPath])

  const handleItemClick = (post) => {
    addModals([modalize(post)])
  }

  return (
    <>
      <Layout preview={preview}>
        <NextSeo
          title="Exhibitions | Hard to Read"
          description={exhibitionDocs.map((post) => post.title).join(', ')}
          openGraph={{
            url: 'https://hardtoread.us/exhibitions',
            title: 'Exhibitions',
          }}
        />
        <x.div px={0} display={'grid'} gridTemplateColumns={'10'} gap={8}>
          {exhibitionDocs.map((post, i) => (
            <ExhibitionListing key={post._id} post={post} i={i} />
          ))}
        </x.div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const [exhibitionDocs, siteData] = await Promise.all([
    overlayDrafts(await getClient(preview).fetch(exhibitionQuery)),
    await getClient(preview).fetch(siteQuery),
  ])
  return {
    props: { exhibitionDocs, siteData, preview },
  }
}

export default Exhibitions
