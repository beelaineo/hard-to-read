import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout'
import { themeQuery, siteQuery } from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import { x, defaultTheme } from '@xstyled/styled-components'
import { useModal } from '../../providers/ModalProvider'
import { modalize } from '../../utils'

const Themes = ({ themeDocs, siteData, preview }) => {
  const { addModals } = useModal()

  const handleItemClick = (theme) => {
    addModals([modalize(theme)])
  }

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Themes</title>
        </Head>
        <x.div px={0}>
          {themeDocs.map((post) => {
            return (
              <x.div key={post._id}>
                {/* <Link href={`/events/${post.slug}`}> */}
                <x.a
                  display={'grid'}
                  gridTemplateColumns={'10'}
                  onClick={() => handleItemClick(post)}
                >
                  <x.div gridColumn={'span 3'}>{post.title}</x.div>
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
  const [themeDocs, siteData] = await Promise.all([
    overlayDrafts(await getClient(preview).fetch(themeQuery)),
    await getClient(preview).fetch(siteQuery),
  ])
  return {
    props: { themeDocs, siteData, preview },
  }
}

export default Themes
