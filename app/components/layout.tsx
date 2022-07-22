import Alert from '../components/alert'
import Header from '../components/header'
import Footer from '../components/footer'
import Meta from '../components/meta'
import { x } from '@xstyled/styled-components'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert preview={preview} />
        <Header />
        <x.main pt={100} pb={200}>
          {children}
        </x.main>
        <Footer />
      </div>
    </>
  )
}
