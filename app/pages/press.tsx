import * as React from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import PressList from '../components/press-list'
import { GetStaticProps, GetStaticPaths } from 'next'
import styled, { x, css } from '@xstyled/styled-components'
import { definitely, modalize } from '../utils'
import { siteQuery, pressQuery } from '../lib/queries'
import { getClient, overlayDrafts, sanityClient } from '../lib/sanity.server'
import { useModal } from '../providers/ModalProvider'
import { PortableText } from '@portabletext/react'

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
`

const PortableTextWrapper = styled.div`
  font-size: 1.25rem;
  grid-column: span 4 / 8;
  p {
    margin-bottom: 6;
  }
`

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const [siteData, pressDocs] = await Promise.all([
    await getClient(preview).fetch(siteQuery),
    overlayDrafts(await getClient(preview).fetch(pressQuery)),
  ])
  return {
    props: { siteData, pressDocs, preview },
  }
}

const Press = ({ siteData, pressDocs, preview }) => {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Press | Hard to Read</title>
        </Head>
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
