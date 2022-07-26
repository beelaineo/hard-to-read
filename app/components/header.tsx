import Link from 'next/link'
import { x } from '@xstyled/styled-components'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()
  const path = router.pathname

  const title =
    path == '/about' || path == '/'
      ? 'Hard'
      : router.pathname.slice(1).replace(/^\w/, (c) => c.toUpperCase())

  return (
    <x.header position={'fixed'} left={0} right={0} top={0} m={4} zIndex={10}>
      <x.h1
        display={'grid'}
        gridTemplateColumns={10}
        fontSize={{ _: '2xl', md: '4xl' }}
        letterSpacing={'tight'}
      >
        <Link href="/">
          <x.a gridColumn={'span 3'} textDecoration={{ hover: 'underline' }}>
            {title}
          </x.a>
        </Link>
        <Link href="/">
          <x.a gridColumn={'span 4'} textDecoration={{ hover: 'underline' }}>
            to
          </x.a>
        </Link>
        <Link href="/">
          <x.a gridColumn={'span 3'} textDecoration={{ hover: 'underline' }}>
            Read
          </x.a>
        </Link>
      </x.h1>
    </x.header>
  )
}
