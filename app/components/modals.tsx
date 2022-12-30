import * as React from 'react'
import styled, { x } from '@xstyled/styled-components'
import Modal from './modal'
import { useModal } from '../providers/ModalProvider'
import DuckSVG from './duck.svg'
import { useRouter } from 'next/router'

const { useState, useEffect } = React

const Wrapper = styled.div`
  #duckIcon {
    display: none;
    .cls-1 {
      stroke: primary;
    }
    #duck path {
      fill: primary20;
    }
  }
  @media (min-width: sm) {
    grid-column: span 2;
    #duckIcon {
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
  useEffect(() => setPageFX(new Audio('/page.mp3')), [])

  const router = useRouter()

  const handleQuack = () => {
    if (modals.length > 0) {
      pageFX?.play()
      resetModals()
    }
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
        <DuckSVG width={140} id="duckIcon" onClick={() => handleQuack()} />
      </x.div>
    </Wrapper>
  )
}
