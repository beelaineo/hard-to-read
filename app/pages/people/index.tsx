import * as React from 'react'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout'
import { peoplePopupsQuery, peopleQuery, siteQuery } from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import { x, defaultTheme } from '@xstyled/styled-components'
import { PersonListing } from '../../components/person-listing'
import { NextSeo } from 'next-seo'
import { definitely, modalize } from '../../utils'
import { useModal } from '../../providers/ModalProvider'
import { useRouter } from 'next/router'

const { useEffect, useState } = React

const People = ({ peopleDocs, siteData, popups, preview }) => {
  const { addModals, resetModals, isMobile } = useModal()
  const router = useRouter()

  const [popularPeople, setPopularPeople] = useState<any[]>([])

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

  useEffect(() => {
    setPopularPeople(
      peopleDocs
        // sort alphabetically by title
        .sort((a, b) => {
          if (a.sortby_name < b.sortby_name) {
            return -1
          }
          if (a.sortby_name > b.sortby_name) {
            return 1
          }
          return 0
        })
        // sort by totalReferences descending
        .sort((a, b) => b.totalReferences - a.totalReferences)
        .slice(0, 30)
        .map((t) => t.title),
    )
  }, [])

  return (
    <>
      <Layout preview={preview}>
        <NextSeo
          title="People | Hard to Read"
          description={popularPeople.join(', ')}
          openGraph={{
            url: 'https://hardtoread.us/people',
            title: 'People',
            description: popularPeople.join(', '),
          }}
        />
        <x.div
          px={0}
          display={'grid'}
          gridTemplateColumns={{ _: 3, sm: 6, md: 6, lg: 10 }}
          gridAutoRows={{ _: '28vw', sm: '14vw', md: '14vw', lg: '8.5vw' }}
          gap={4}
        >
          {peopleDocs.map((post) => {
            return <PersonListing post={post} key={post._id} />
          })}
        </x.div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const [peopleDocs, popups, siteData] = await Promise.all([
    overlayDrafts(await getClient(preview).fetch(peopleQuery)),
    await getClient(preview).fetch(peoplePopupsQuery),
    await getClient(preview).fetch(siteQuery),
  ])
  return {
    props: { peopleDocs, siteData, popups, preview },
  }
}

export default People
