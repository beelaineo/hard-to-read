import * as React from 'react'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout'
import {
  bookQuery,
  bookCollectionQuery,
  siteQuery,
  bookPopupsQuery,
} from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import { x, defaultTheme } from '@xstyled/styled-components'
import { useModal } from '../../providers/ModalProvider'
import { modalize } from '../../utils'
import { ThemeListing } from '../../components/theme-listing'
import { CollectionListing } from '../../components/collection-listing'
import { BookListing } from '../../components/book-listing'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

const { useEffect, useState } = React

const Books = ({ bookDocs, bookCollectionDocs, siteData, popups, preview }) => {
  const { addModals, isMobile, resetModals } = useModal()
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

  const handleItemClick = (book) => {
    addModals([modalize(book)])
  }

  return (
    <>
      <Layout preview={preview}>
        <NextSeo
          title="Books | Hard to Read"
          description={bookCollectionDocs
            .slice(0, 30)
            .map((post) => post.title)
            .join(', ')}
          openGraph={{
            url: 'https://hardtoread.us/books',
            title: 'Books',
          }}
        />
        <x.div px={0} fontSize={'lg'} mt={-50}>
          {bookCollectionDocs.map((post) => (
            <CollectionListing post={post} key={post._id} />
          ))}
          <x.h2 mt={8} color={'primary'}>
            More books:
          </x.h2>
          {bookDocs.map((book) => (
            <BookListing key={book._id} book={book} spineColor={'primary'} />
          ))}
        </x.div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const [bookDocs, bookCollectionDocs, siteData, popups] = await Promise.all([
    overlayDrafts(await getClient(preview).fetch(bookQuery)),
    overlayDrafts(await getClient(preview).fetch(bookCollectionQuery)),
    await getClient(preview).fetch(siteQuery),
    await getClient(preview).fetch(bookPopupsQuery),
  ])
  return {
    props: { bookDocs, bookCollectionDocs, siteData, preview },
  }
}

export default Books
