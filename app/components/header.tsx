import * as React from 'react'
import Link from 'next/link'
import styled, { x } from '@xstyled/styled-components'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()
  const path = router.pathname

  const title =
    path == '/about' || path == '/'
      ? 'Hard'
      : path.includes('/blog')
      ? 'Blog'
      : path.includes('/books')
      ? 'Books'
      : path.includes('/events')
      ? 'Events'
      : path.includes('/exhibitions')
      ? 'Exhibitions'
      : path.includes('/people')
      ? 'People'
      : path.includes('/places')
      ? 'Places'
      : path.includes('/themes')
      ? 'Themes'
      : router.pathname.slice(1).replace(/^\w/, (c) => c.toUpperCase())

  return (
    <x.header
      position={'fixed'}
      left={0}
      right={0}
      top={0}
      m={4}
      zIndex={10}
      pointerEvents={'none'}
    >
      <x.h1
        display={'grid'}
        gridTemplateColumns={{ _: 10, sm: 6, md: 9, lg: 10 }}
        fontSize={{ _: '2xl', md: '4xl' }}
        letterSpacing={'tight'}
      >
        <x.div gridColumn={{ _: '1 / 4', sm: 'span 2', md: 'span 3' }}>
          <Link href="/">
            <x.a pointerEvents={'all'}>{title}</x.a>
          </Link>
        </x.div>
        <x.div
          gridColumn={{
            _: 'span 4',
            sm: 'span 2',
            md: 'span 3',
            lg: 'span 4',
          }}
          px={{ _: 2, sm: 0 }}
        >
          <Link href="/">
            <x.a pointerEvents={'all'}>to</x.a>
          </Link>
        </x.div>
        <x.div gridColumn={{ _: '8 / 11', sm: 'span 2', md: 'span 3' }}>
          <Link href="/">
            <x.a pointerEvents={'all'}>Read</x.a>
          </Link>
        </x.div>
      </x.h1>
    </x.header>
  )
}
