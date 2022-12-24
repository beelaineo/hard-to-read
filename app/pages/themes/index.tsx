import * as React from 'react'
import type { GetStaticProps } from 'next'
import Layout from '../../components/layout'
import { themeQuery, siteQuery, themePopupsQuery } from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import { x, defaultTheme } from '@xstyled/styled-components'
import { useModal } from '../../providers/ModalProvider'
import { modalize } from '../../utils'
import { ThemeListing } from '../../components/theme-listing'
import { NextSeo } from 'next-seo'

const { useEffect, useState } = React

const Themes = ({ themeDocs, siteData, popups, preview }) => {
  const { addModals } = useModal()

  useEffect(() => {
    if (!popups) return
    const modals = popups.map((m) => modalize(m))
    addModals(modals)
  }, [])

  const handleItemClick = (theme) => {
    addModals([modalize(theme)])
  }

  const [themes, setThemes] = useState<any[]>([])
  useEffect(() => setThemes(themeDocs.sort(() => Math.random() - 0.5)), [])

  return (
    <>
      <Layout preview={preview}>
        <NextSeo
          title="Themes | Hard to Read"
          openGraph={{
            url: 'https://hardtoread.us/themes',
            title: 'Themes',
          }}
        />
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
  const [themeDocs, siteData, popups] = await Promise.all([
    overlayDrafts(await getClient(preview).fetch(themeQuery)),
    await getClient(preview).fetch(siteQuery),
    await getClient(preview).fetch(themePopupsQuery),
  ])
  return {
    props: { themeDocs, siteData, popups, preview },
  }
}

export default Themes
