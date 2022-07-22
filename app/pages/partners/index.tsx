import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout'
import { partnerQuery, siteQuery } from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import { x, defaultTheme } from '@xstyled/styled-components'
import { useModal } from '../../providers/ModalProvider'
import { modalize } from '../../utils'

const Partners = ({ partnerDocs, siteData, preview }) => {
  const { addModals } = useModal()

  const handleItemClick = (partner) => {
    addModals([modalize(partner)])
  }

  const partners = partnerDocs.filter((p) => p.type == 'default')
  const sponsors = partnerDocs.filter((p) => p.type == 'sponsor')
  const fundraisers = partnerDocs.filter((p) => p.type == 'fundraiser')

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Partners</title>
        </Head>
        <x.div px={0} display={'grid'} gridTemplateColumns={'10'}>
          <x.div gridColumn={'span 3'}>
            <h2>Publishers</h2>
            {partners.map((post) => {
              return (
                <x.div key={post._id}>
                  <x.a onClick={() => handleItemClick(post)}>{post.title}</x.a>
                </x.div>
              )
            })}
          </x.div>
          <x.div gridColumn={'span 4'}>
            <h2>Sponsors</h2>
            {sponsors.map((post) => {
              return (
                <x.div key={post._id}>
                  <x.a onClick={() => handleItemClick(post)}>{post.title}</x.a>
                </x.div>
              )
            })}
          </x.div>
          <x.div gridColumn={'span 3'}>
            <h2>Fundraisers</h2>
            {fundraisers.map((post) => {
              return (
                <x.div key={post._id}>
                  <x.a onClick={() => handleItemClick(post)}>{post.title}</x.a>
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
  const [partnerDocs, siteData] = await Promise.all([
    overlayDrafts(await getClient(preview).fetch(partnerQuery)),
    await getClient(preview).fetch(siteQuery),
  ])
  return {
    props: { partnerDocs, siteData, preview },
  }
}

export default Partners
