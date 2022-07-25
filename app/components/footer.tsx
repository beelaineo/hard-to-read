import * as React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import NavLink from 'next/link'
import styled, { x, css } from '@xstyled/styled-components'
import { useSiteData } from '../providers/SiteDataProvider'
import { useModal } from '../providers/ModalProvider'
import { modalize } from '../utils'
const { useState, useEffect } = React

interface WithActive {
  active: boolean
}

const StyledLink = styled.a<WithActive>`
  ${({ active }) => css`
    text-decoration: ${active ? 'underline' : 'none'};
    :hover {
      text-decoration: underline;
    }
  `}
`

export default function Footer() {
  const siteData = useSiteData()
  const socials = siteData?.siteSettings?.socials ?? []
  const router = useRouter()
  const { modals, resetModals } = useModal()
  const pathName = router.pathname

  const [pageFX, setPageFX] = useState<HTMLAudioElement | null>(null)
  useEffect(() => setPageFX(new Audio('/page.mp3')), [])

  const handleQuack = () => {
    if (modals.length > 0) {
      pageFX?.play()
      resetModals()
    }
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
          <NavLink href="/blog">
            <StyledLink active={pathName === '/blog'}>Blog</StyledLink>
          </NavLink>
          <NavLink href="/about">
            <StyledLink active={pathName === '/about'}>About</StyledLink>
          </NavLink>
          <NavLink href="/press">
            <StyledLink active={pathName === '/press'}>Press</StyledLink>
          </NavLink>
        </x.nav>
      </x.section>
      <x.section gridColumn={'span 4'} p={4} bg={'white'}>
        <x.nav display={'flex'} flexDirection={'column'}>
          <NavLink href="/events">
            <StyledLink active={pathName === '/events'}>Events</StyledLink>
          </NavLink>
          <NavLink href="/exhibitions">
            <StyledLink active={pathName === '/exhibitions'}>
              Exhibitions
            </StyledLink>
          </NavLink>
          <NavLink href="/people">
            <StyledLink active={pathName === '/people'}>People</StyledLink>
          </NavLink>
          <NavLink href="/themes">
            <StyledLink active={pathName === '/themes'}>Themes</StyledLink>
          </NavLink>
          <NavLink href="/partners">
            <StyledLink active={pathName === '/partners'}>Partners</StyledLink>
          </NavLink>
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
