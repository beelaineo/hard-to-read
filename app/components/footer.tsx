import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled, { x, css } from '@xstyled/styled-components'
import { useSiteData } from '../providers/SiteDataProvider'
import { useModal } from '../providers/ModalProvider'
import { modalize } from '../utils'
const { useState, useEffect } = React

export default function Footer() {
  const siteData = useSiteData()
  const socials = siteData?.siteSettings?.socials ?? []

  const { resetModals } = useModal()

  const [pageFX, setPageFX] = useState<HTMLAudioElement | null>(null)
  useEffect(() => setPageFX(new Audio('/page.mp3')), [])

  const handleQuack = () => {
    pageFX?.play()
    resetModals()
  }

  return (
    <x.footer
      position={'fixed'}
      bottom={0}
      left={0}
      right={0}
      minHeight={160}
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
      <x.section gridColumn={'span 3'} p={4} bg={'white'} position={'relative'}>
        {socials && socials.length > 0 ? (
          <x.nav display={'flex'} flexDirection={'column'}>
            {socials.map((s) => {
              return (
                <x.a
                  textDecoration={{ _: 'none', hover: 'underline' }}
                  key={s._key}
                  href={s.url}
                  target={'_blank'}
                >
                  {s.title}
                </x.a>
              )
            })}
          </x.nav>
        ) : null}
        <x.div position={'absolute'} right={24} bottom={16} cursor={'pointer'}>
          <Image
            src={'/duck.png'}
            width={'140'}
            height={'120'}
            onClick={() => handleQuack()}
          />
        </x.div>
      </x.section>
    </x.footer>
  )
}
