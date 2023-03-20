import * as React from 'react'
import type { AppProps } from 'next/app'
import { Providers } from '../providers/AllProviders'
import styled from '@xstyled/styled-components'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import Modals from '../components/modals'
import { SiteSettings } from '../interfaces'

const Main = styled.div`
  transition: background-color 0.3s;
  display: flex;
  flex-direction: column;
`

interface MyAppProps {
  Component: AppProps['Component']
  pageProps: Record<string, any>
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const { siteData } = pageProps

  return (
    <Providers siteData={siteData}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=2"
        />
      </Head>
      <DefaultSeo {...SEO} />
      <Main>
        <Component {...pageProps} />
        <Modals />
      </Main>
    </Providers>
  )
}

export default MyApp
