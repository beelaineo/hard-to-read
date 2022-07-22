import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout'
import { peopleQuery, siteQuery } from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import { x, defaultTheme } from '@xstyled/styled-components'
import { useModal } from '../../providers/ModalProvider'
import { modalize } from '../../utils'

const People = ({ peopleDocs, siteData, preview }) => {
  const { addModals } = useModal()

  const handleItemClick = (person) => {
    addModals([modalize(person)])
  }

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>People</title>
        </Head>
        <x.div px={0}>
          {peopleDocs.map((post) => {
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
  const [peopleDocs, siteData] = await Promise.all([
    overlayDrafts(await getClient(preview).fetch(peopleQuery)),
    await getClient(preview).fetch(siteQuery),
  ])
  return {
    props: { peopleDocs, siteData, preview },
  }
}

export default People
