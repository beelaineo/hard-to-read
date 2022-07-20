import Alert from '../components/alert'
import Header from '../components/header'
import Footer from '../components/footer'
import Meta from '../components/meta'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert preview={preview} />
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}
