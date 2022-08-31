import * as React from 'react'
import { useRouter } from 'next/router'
//@ts-ignore
import DuckSVG from './duck.svg'
import NavLink from 'next/link'
import styled, { x, css } from '@xstyled/styled-components'
import { useSiteData } from '../providers/SiteDataProvider'
import { useModal } from '../providers/ModalProvider'
import { modalize } from '../utils'
import { DefaultContext } from 'react-icons'
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

interface WithSpanBGColor {
  span: number
  bgColor: string
}

const Column = styled.div<WithSpanBGColor>`
  ${({ theme, span, bgColor }) => css`
    grid-column: span 1;
    padding: 4;
    background-color: ${bgColor};
    position: relative;
    z-index: 10;
    @media (min-width: sm) {
      grid-column: span 2;
    }
    @media (min-width: md) {
      grid-column: span 3;
    }
    @media (min-width: lg) {
      grid-column: span ${span};
    }
    &:after {
      content: '';
      position: absolute;
      background-color: #fff;
      opacity: 0.85;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 11;
    }
    &:nth-of-type(1) {
      opacity: 0.75;
    }
    nav {
      position: absolute;
      z-index: 12;
    }
    svg path.cls-1 {
      stroke: ${theme.colors.primary};
    }
    svg path:last-of-type {
      fill: ${theme.colors.primary};
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
      gridTemplateColumns={{ _: 3, sm: 6, md: 9, lg: 10 }}
      gap={'1px'}
      bg={'primary'}
      p={'1px'}
      fontSize={'lg'}
    >
      <Column span={3} bgColor={'primary'}>
        <x.nav display={'flex'} flexDirection={'column'}>
          <NavLink href="/about">
            <StyledLink active={pathName === '/about'}>About</StyledLink>
          </NavLink>
          <NavLink href="/blog">
            <StyledLink active={pathName === '/blog'}>Blog</StyledLink>
          </NavLink>
          <NavLink href="/partners">
            <StyledLink active={pathName === '/partners'}>Partners</StyledLink>
          </NavLink>
          <NavLink href="/press">
            <StyledLink active={pathName === '/press'}>Press</StyledLink>
          </NavLink>
        </x.nav>
      </Column>
      <Column span={4} bgColor={'primary'}>
        <x.nav display={'flex'} flexDirection={'column'}>
          <NavLink href="/books">
            <StyledLink active={pathName === '/books'}>Books</StyledLink>
          </NavLink>
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
        </x.nav>
      </Column>
      <Column span={3} bgColor={'primary'}>
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
        <x.div
          position={'absolute'}
          right={24}
          bottom={16}
          cursor={'pointer'}
          zIndex={12}
        >
          <DuckSVG width={140} onClick={() => handleQuack()} />
        </x.div>
      </Column>
    </x.footer>
  )
}
