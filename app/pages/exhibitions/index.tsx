import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout'
import { exhibitionQuery, siteQuery } from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import { x, defaultTheme } from '@xstyled/styled-components'
import { useModal } from '../../providers/ModalProvider'
import { modalize } from '../../utils'
import { ExhibitionListing } from '../../components/exhibition-listing'

const Exhibitions = ({ exhibitionDocs, siteData, preview }) => {
  const { addModals } = useModal()

  const handleItemClick = (post) => {
    addModals([modalize(post)])
  }

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Exhibitions</title>
        </Head>
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
