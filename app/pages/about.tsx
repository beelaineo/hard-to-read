import * as React from 'react'
import Layout from '../components/layout'
import { GetStaticProps, GetStaticPaths } from 'next'
import styled, { x, css } from '@xstyled/styled-components'
import { definitely, modalize } from '../utils'
import { siteQuery, pressQuery } from '../lib/queries'
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
`

const PortableTextWrapper = styled.div`
  font-size: 1.25rem;
  grid-column: span 4 / 8;
  p {
    margin-bottom: 6;
  }
  a {
    border-bottom: 2px;
    border-style: solid;
    border-color: primary;
  }
`

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const [siteData] = await Promise.all([
    await getClient(preview).fetch(siteQuery),
  ])
  return {
    props: { siteData, preview },
  }
}

const About = ({ siteData, preview }) => {
  return (
    <>
      <Layout preview={preview}>
        <NextSeo
          title="About | Hard to Read"
          description={siteData.description}
          openGraph={{
            url: 'https://hardtoread.us/about',
            title: 'About',
            description: siteData.description,
          }}
        />
        <Grid>
          <PortableTextWrapper>
            <PortableText value={siteData.about} />
          </PortableTextWrapper>
        </Grid>
      </Layout>
    </>
  )
}

export default About
