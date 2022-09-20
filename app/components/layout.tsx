import * as React from 'react'
import Alert from '../components/alert'
import Header from '../components/header'
import Footer from '../components/footer'
import Meta from '../components/meta'
import { x, styled } from '@xstyled/styled-components'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <x.div className="min-h-screen">
        <Alert preview={preview} />
        <Header />
        <x.main px={4} pt={{ _: 0, sm: 100 }} pb={{ _: 16, sm: 200 }}>
          {children}
        </x.main>
        <Footer />
      </x.div>
    </>
  )
}
