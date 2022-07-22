import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout'
import { exhibitionQuery, siteQuery } from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import { x, defaultTheme } from '@xstyled/styled-components'
import { useModal } from '../../providers/ModalProvider'
import { modalize } from '../../utils'

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
        <x.div px={3}>
          {exhibitionDocs.map((post) => {
            return (
              <x.div key={post._id}>
                {/* <Link href={`/events/${post.slug}`}> */}
                <x.a
                  display={'grid'}
                  gridTemplateColumns={'10'}
                  onClick={() => handleItemClick(post)}
                >
                  <x.div gridColumn={'span 3'}>{post.title}</x.div>
                  <x.div gridColumn={'span 1'}>{post.date}</x.div>
                  <x.div>{post.title}</x.div>
                </x.a>
                {/* </Link> */}
              </x.div>
            )
          })}
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
