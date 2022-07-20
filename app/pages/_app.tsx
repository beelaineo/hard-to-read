import '../styles/globals.css'
import '../styles/index.css'
import type { AppProps } from 'next/app'
import { Providers } from '../providers/AllProviders'
import Head from 'next/head'


function MyApp({ Component, pageProps, pageProps: allPageProps }: AppProps) {
  const { siteData } = allPageProps
  if (!siteData) return null

  return (
    <Providers siteData={siteData}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=2"
        />
      </Head>
      <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp
