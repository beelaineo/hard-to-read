import * as React from 'react'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout'
import { themeQuery, siteQuery } from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import { x, defaultTheme } from '@xstyled/styled-components'
import { useModal } from '../../providers/ModalProvider'
import { modalize } from '../../utils'
import { ThemeListing } from '../../components/theme-listing'

const { useEffect, useState } = React

const Themes = ({ themeDocs, siteData, preview }) => {
  const { addModals } = useModal()

  const handleItemClick = (theme) => {
    addModals([modalize(theme)])
  }

  const [themes, setThemes] = useState<any[]>([])
  useEffect(() => setThemes(themeDocs.sort(() => Math.random() - 0.5)), [])

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Themes</title>
        </Head>
        <x.div
          px={0}
          display={'grid'}
          gridTemplateColumns={'10'}
          gridAutoColumns={'min-content'}
          gridAutoRows={'min-content'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {themes.map((post) => (
            <ThemeListing post={post} key={post._id} />
          ))}
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
