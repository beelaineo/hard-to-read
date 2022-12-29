import * as React from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import PressList from '../components/press-list'
import { GetStaticProps, GetStaticPaths } from 'next'
import styled, { x, css } from '@xstyled/styled-components'
import { definitely, modalize } from '../utils'
import { siteQuery, pressQuery, pressPopupsQuery } from '../lib/queries'
import { getClient, overlayDrafts, sanityClient } from '../lib/sanity.server'
import { useModal } from '../providers/ModalProvider'
import { PortableText } from '@portabletext/react'
import { NextSeo } from 'next-seo'

const { useEffect, useState, useRef } = React

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  @media (max-width: lg) {
    grid-template-columns: 1fr;
  }
`

const PressToggleWrapper = styled.div`
  grid-column: span 4 / 8;
`

const PressWrapper = styled.div`
  grid-column: span 10;
  a:hover {
    text-decoration: underline;
    color: primary;
  }
`

const PortableTextWrapper = styled.div`
  font-size: 1.25rem;
  grid-column: span 4 / 8;
  p {
    margin-bottom: 6;
  }
`

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const [siteData, pressDocs, popups] = await Promise.all([
    await getClient(preview).fetch(siteQuery),
    overlayDrafts(await getClient(preview).fetch(pressQuery)),
    await getClient(preview).fetch(pressPopupsQuery),
  ])
  return {
    props: { siteData, pressDocs, popups, preview },
  }
}

const Press = ({ siteData, pressDocs, popups, preview }) => {
  const { addModals } = useModal()

  useEffect(() => {
    if (!popups) return
    console.log('POPUPS press', popups)
    const modals = popups.map((m) => modalize(m))
    addModals(modals)
  }, [])

  return (
    <>
      <Layout preview={preview}>
        <NextSeo
          title="Press | Hard to Read"
          description={siteData.description}
          openGraph={{
            url: 'https://hardtoread.us/press',
            title: 'Press',
            description: siteData.description,
          }}
        />
        <Grid>
          <PressWrapper>
            <PressList pressDocs={pressDocs} />
          </PressWrapper>
        </Grid>
      </Layout>
    </>
  )
}

export default Press
