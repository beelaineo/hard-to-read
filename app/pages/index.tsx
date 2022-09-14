import * as React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Container from '../components/container'
import Layout from '../components/layout'
import { GetStaticProps, GetStaticPaths } from 'next'
import styled, { css } from '@xstyled/styled-components'
import Image from 'next/image'
import { ContentBlock } from '../components/content-block'
import { definitely, modalize } from '../utils'
import { indexQuery, siteQuery } from '../lib/queries'
import { Home, Modal } from '../interfaces'
import { getClient, overlayDrafts, sanityClient } from '../lib/sanity.server'
import { useModal } from '../providers/ModalProvider'
import { NextSeo } from 'next-seo'

const { useEffect, useRef } = React

const Grid = styled.main`
  ${({ theme }) => css`
    display: block;
  `}
`

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const [homeDocs, siteData] = await Promise.all([
    overlayDrafts(await getClient(preview).fetch(indexQuery)),
    await getClient(preview).fetch(siteQuery),
  ])
  return {
    props: { homeDocs, siteData, preview },
  }
}

const Index = ({ homeDocs, siteData, preview }) => {
  const homeDoc: Home = homeDocs[0]
  const firstBlockRef = useRef<HTMLDivElement>(null)
  const { _updatedAt, title, content } = homeDoc
  const { addModals } = useModal()
  // const defaultSeo = {
  //   title: title,
  //   description: seo?.description,
  //   image:
  //     firstHero && firstHero.__typename === 'Hero'
  //       ? getHeroImage(firstHero)
  //       : undefined,
  // }

  useEffect(() => {
    if (!content) return
    const modals = content.map((m) => modalize(m))
    addModals(modals)
  }, [])

  return (
    <>
      <Layout preview={preview}>
        <NextSeo
          title="Hard to Read"
          description={siteData.description}
          openGraph={{
            url: 'https://hardtoread.us/',
            title: 'Home',
            description: siteData.description,
          }}
        />
      </Layout>
    </>
  )
}

export default Index
