import * as React from 'react'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout'
import { partnerQuery, siteQuery, partnersPopupsQuery } from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import { x, defaultTheme } from '@xstyled/styled-components'
import { useModal } from '../../providers/ModalProvider'
import { modalize } from '../../utils'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

const { useEffect } = React

const Partners = ({ partnerDocs, siteData, popups, preview }) => {
  const { addModals, resetModals, isMobile } = useModal()
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = () => {
      if (isMobile == true) {
        resetModals()
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    if (!popups) return
    const modals = popups.map((m) => modalize(m))
    addModals(modals)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.asPath])

  const handleItemClick = (partner) => {
    addModals([modalize(partner)])
  }

  const partners = partnerDocs.filter((p) => p.type == 'default')
  const sponsors = partnerDocs.filter((p) => p.type == 'sponsor')
  const fundraisers = partnerDocs.filter((p) => p.type == 'fundraiser')
  const venues = partnerDocs.filter((p) => p.type == 'venue')

  return (
    <>
      <Layout preview={preview}>
        <NextSeo
          title="Partners | Hard to Read"
          openGraph={{
            url: 'https://hardtoread.us/partners',
            title: 'Partners',
          }}
        />
        <x.div
          px={0}
          display={'grid'}
          gridTemplateColumns={{ _: '12', lg: '10' }}
          lineHeight={1.5}
        >
          <x.div gridColumn={{ _: 'span 12', sm: 'span 4', lg: 'span 3' }}>
            <x.h2 color={'primary'}>Publishers</x.h2>
            {partners.map((post) => {
              return (
                <x.div key={post._id}>
                  <x.a onClick={() => handleItemClick(post)}>{post.title}</x.a>
                  {post.link ? (
                    <x.a
                      fontSize={'md'}
                      ml={1}
                      color={'primary'}
                      target={'_blank'}
                      href={post.link}
                    >
                      ↗
                    </x.a>
                  ) : null}
                </x.div>
              )
            })}
          </x.div>
          <x.div gridColumn={{ _: 'span 12', sm: 'span 4', lg: 'span 4' }}>
            <x.h2 color={'primary'}>Venues</x.h2>
            {venues.map((post) => {
              return (
                <x.div key={post._id}>
                  <x.a onClick={() => handleItemClick(post)}>{post.title}</x.a>
                  {post.link ? (
                    <x.a
                      fontSize={'md'}
                      ml={1}
                      color={'primary'}
                      target={'_blank'}
                      href={post.link}
                    >
                      ↗
                    </x.a>
                  ) : null}
                </x.div>
              )
            })}
          </x.div>
          <x.div gridColumn={{ _: 'span 12', sm: 'span 3', lg: 'span 3' }}>
            <x.h2 color={'primary'}>Sponsors</x.h2>
            {sponsors.map((post) => {
              return (
                <x.div key={post._id}>
                  <x.a onClick={() => handleItemClick(post)}>{post.title}</x.a>
                  {post.link ? (
                    <x.a
                      fontSize={'md'}
                      ml={1}
                      color={'primary'}
                      target={'_blank'}
                      href={post.link}
                    >
                      ↗
                    </x.a>
                  ) : null}
                </x.div>
              )
            })}
            <x.h2 mt={4} color={'primary'}>
              Fundraisers
            </x.h2>
            {fundraisers.map((post) => {
              return (
                <x.div key={post._id}>
                  <x.a onClick={() => handleItemClick(post)}>{post.title}</x.a>
                  {post.link ? (
                    <x.a
                      fontSize={'md'}
                      ml={1}
                      color={'primary'}
                      target={'_blank'}
                      href={post.link}
                    >
                      ↗
                    </x.a>
                  ) : null}
                </x.div>
              )
            })}
          </x.div>
        </x.div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const [partnerDocs, siteData, popups] = await Promise.all([
    overlayDrafts(await getClient(preview).fetch(partnerQuery)),
    await getClient(preview).fetch(siteQuery),
    await getClient(preview).fetch(partnersPopupsQuery),
  ])
  return {
    props: { partnerDocs, siteData, popups, preview },
  }
}

export default Partners
