import * as React from 'react'
import { x } from '@xstyled/styled-components'
import Modal from './modal'
import { useModal } from '../providers/ModalProvider'

const { useState, useEffect } = React

export default function Modals() {
  const { modals } = useModal()
  const [zFloor, setZFloor] = useState(modals.length)

  return (
    <x.div
      position={{ _: 'static', sm: 'fixed' }}
      top={0}
      bottom={0}
      left={0}
      right={0}
      pointerEvents={'none'}
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
  )
}
