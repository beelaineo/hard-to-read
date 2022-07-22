import Container from './container'
import Link from 'next/link'
import { x } from '@xstyled/styled-components'
import { useSiteData } from '../providers/SiteDataProvider'

export default function Footer() {
  const siteData = useSiteData()
  const socials = siteData?.siteSettings?.socials ?? []

  return (
    <x.footer
      position={'fixed'}
      bottom={0}
      left={0}
      right={0}
      display={'grid'}
      gridTemplateColumns={10}
      gap={'1px'}
      bg={'black'}
      p={'1px'}
    >
      <x.section gridColumn={'span 3'} p={4} bg={'gray-200'}>
        <x.nav display={'flex'} flexDirection={'column'}>
          <Link href="/blog">
            <x.a textDecoration={{ hover: 'underline' }}>Blog</x.a>
          </Link>
          <Link href="/about">
            <x.a textDecoration={{ hover: 'underline' }}>About</x.a>
          </Link>
        </x.nav>
      </x.section>
      <x.section gridColumn={'span 4'} p={4} bg={'white'}>
        <x.nav display={'flex'} flexDirection={'column'}>
          <Link href="/events">
            <x.a textDecoration={{ hover: 'underline' }}>Events</x.a>
          </Link>
          <Link href="/exhibitions">
            <x.a textDecoration={{ hover: 'underline' }}>Exhibitions</x.a>
          </Link>
          <Link href="/people">
            <x.a textDecoration={{ hover: 'underline' }}>People</x.a>
          </Link>
          <Link href="/themes">
            <x.a textDecoration={{ hover: 'underline' }}>Themes</x.a>
          </Link>
          <Link href="/partners">
            <x.a textDecoration={{ hover: 'underline' }}>Partners</x.a>
          </Link>
        </x.nav>
      </x.section>
      <x.section gridColumn={'span 3'} p={4} bg={'white'}>
        {socials && socials.length > 0 ? (
          <x.nav display={'flex'} flexDirection={'column'}>
            {socials.map((s) => {
              return (
                <x.a
                  textDecoration={{ _: 'none', hover: 'underline' }}
                  key={s._key}
                  href={s.url}
                >
                  {s.title}
                </x.a>
              )
            })}
          </x.nav>
        ) : null}
      </x.section>
    </x.footer>
  )
}
