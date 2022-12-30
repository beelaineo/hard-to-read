import * as React from 'react'
import Alert from '../components/alert'
import Header from '../components/header'
import Footer from '../components/footer'
import Meta from '../components/meta'
import { x, styled } from '@xstyled/styled-components'
import { useRouter } from 'next/router'
import { useModal } from '../providers/ModalProvider'
const { useEffect, useState } = React

export default function Layout({ preview, children }) {
  const { setMobile, isMobile } = useModal()

  useEffect(() => {
    if (!window) return
    const handleResize = () => {
      setMobile(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const router = useRouter()
  return (
    <>
      <Meta />
      <x.div className="min-h-screen">
        <Alert preview={preview} />
        <Header />
        <x.main
          px={router.asPath == '/' ? 0 : 4}
          pt={{ _: router.asPath == '/' ? 0 : 16, sm: 100 }}
          pb={{ _: router.asPath == '/' ? 0 : 16, sm: 200 }}
        >
          {children}
        </x.main>
        <Footer />
      </x.div>
    </>
  )
}
