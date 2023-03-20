import * as React from 'react'
import styled, { x } from '@xstyled/styled-components'
import Modal from './modal'
import { useModal } from '../providers/ModalProvider'
import { ReactComponent as DuckSVG } from './duck.svg'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

import { Pinyon_Script } from 'next/font/google'
const pinyon = Pinyon_Script({
  weight: '400',
  subsets: ['latin'],
})

const { useState, useEffect } = React

const Wrapper = styled.div`
  #modalsCount {
    display: none;
  }
  #duckIcon {
    display: none;
    .cls-1 {
      stroke: primary;
    }
    #duck path {
      fill: primary20;
    }
    #duck #eye #pupil {
      fill: primary;
    }
    #duck #eye path {
      fill: none;
    }
  }
  #touchMe:after {
    content: '➦';
    position: absolute;
    font-size: 36px;
    top: 0;
    bottom: 0;
    right: -24px;
    transform: rotate(90deg);
    color: secondary;
  }
  @keyframes slideIn {
    0% {
      transform: rotate(10deg);
    }
    100% {
      transform: rotate(-10deg);
    }
  }
  @media (min-width: sm) {
    grid-column: span 2;
    #duckIcon,
    #modalsCount {
      display: block;
    }
  }
  @media (max-width: sm) {
    &.press,
    &.partners,
    &.events,
    &.themes,
    &.people {
      order: -1;
    }
    padding-bottom: 3rem;
  }
`

export default function Modals() {
  const { modals, resetModals } = useModal()
  const [zFloor, setZFloor] = useState(modals.length)
  const [pageFX, setPageFX] = useState<HTMLAudioElement | null>(null)
  const [isDuckHovered, setDuckHovered] = useState(false)
  const [isDuckTipVisible, showDuckTip] = useState(false)
  useEffect(() => {
    setPageFX(new Audio('/page.mp3'))
    if (!Cookies.get('hideQuackTip')) showDuckTip(true)
  }, [])

  const router = useRouter()

  const handleQuack = () => {
    if (!Cookies.get('hideQuackTip'))
      Cookies.set('hideQuackTip', 'true', { expires: 365 })
    showDuckTip(false)

    if (modals.length > 0) {
      pageFX?.play()
      resetModals()
    }
  }

  const handleDuckMouse = () => {
    setDuckHovered(true)
  }

  return (
    <Wrapper className={router.pathname.replace('/', ' ')}>
      <x.div
        position={{ _: 'static', sm: 'fixed' }}
        top={0}
        bottom={0}
        left={0}
        right={0}
        pointerEvents={'none'}
        order={{ _: -1, sm: 0 }}
        pt={{ _: 16, sm: 0 }}
      >
        {modals.map((modal, i) => (
          <Modal
            key={modal.id}
            modal={modal}
            i={i}
            count={modals.length}
            zFloor={zFloor}
            setZFloor={setZFloor}
          />
        ))}
      </x.div>
      <x.div
        position={'fixed'}
        right={24}
        bottom={16}
        cursor={'pointer'}
        zIndex={12}
      >
        {isDuckTipVisible ? (
          <x.div
            id="touchMe"
            className={pinyon.className}
            border={'4px solid black'}
            borderColor={'secondary'}
            borderStyle={'double'}
            h="72px"
            w={160}
            lineHeight={'32px'}
            textAlign={'center'}
            backgroundColor={'white'}
            p={4}
            whiteSpace={'nowrap'}
            fontSize={isDuckHovered ? 20 : 32}
            position={'absolute'}
            display={{ _: 'none', sm: 'block' }}
            bottom={140}
            right={70}
            transform={'rotate(-15deg)'}
            animation={'1s ease-in-out slideIn infinite alternate'}
          >
            {isDuckHovered ? 'For a fresh start.' : 'Touch Me.'}
          </x.div>
        ) : null}
        <DuckSVG
          width={140}
          id="duckIcon"
          onClick={() => handleQuack()}
          onMouseEnter={() => setDuckHovered(true)}
          onMouseLeave={() => setDuckHovered(false)}
        />
        {modals && modals.length > 0 && (
          <x.span
            id="modalsCount"
            display={'block'}
            position={'absolute'}
            bottom={6}
            right={8}
            fontSize={12}
            color={'primary'}
          >
            {modals.length}
          </x.span>
        )}
      </x.div>
    </Wrapper>
  )
}
