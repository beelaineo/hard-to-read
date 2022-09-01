import * as React from 'react'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout'
import { bookQuery, bookCollectionQuery, siteQuery } from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import { x, defaultTheme } from '@xstyled/styled-components'
import { useModal } from '../../providers/ModalProvider'
import { modalize } from '../../utils'
import { ThemeListing } from '../../components/theme-listing'
import { CollectionListing } from '../../components/collection-listing'
import { BookListing } from '../../components/book-listing'

const { useEffect, useState } = React

const Books = ({ bookDocs, bookCollectionDocs, siteData, preview }) => {
  const { addModals } = useModal()

  const handleItemClick = (book) => {
    addModals([modalize(book)])
  }

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Books</title>
        </Head>
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
  const [bookDocs, bookCollectionDocs, siteData] = await Promise.all([
    overlayDrafts(await getClient(preview).fetch(bookQuery)),
    overlayDrafts(await getClient(preview).fetch(bookCollectionQuery)),
    await getClient(preview).fetch(siteQuery),
  ])
  return {
    props: { bookDocs, bookCollectionDocs, siteData, preview },
  }
}

export default Books
