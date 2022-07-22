import type { AppProps } from 'next/app'
import { Providers } from '../providers/AllProviders'
import styled from '@xstyled/styled-components'
import Head from 'next/head'
import Modals from '../components/modals'

const Main = styled.div`
  background-color: background;
  transition: background-color 0.3s;
`

function MyApp({ Component, pageProps, pageProps: allPageProps }: AppProps) {
  const { data } = allPageProps
  const siteData = data ? data.siteData : allPageProps.siteData

  return (
    <Providers siteData={siteData}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=2"
        />
      </Head>
      <Main>
        <Component {...pageProps} />
      </Main>
      <Modals />
    </Providers>
  )
}

export default MyApp
