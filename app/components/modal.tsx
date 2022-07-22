import * as React from 'react'
import { x } from '@xstyled/styled-components'
import { useModal } from '../providers/ModalProvider'
import Draggable from 'react-draggable'

const { useEffect, useState } = React

export default function Modal({ modal }) {
  const { removeModal, pulseModal } = useModal()
  const { id, type, content } = modal

  const handleCloseClick = (modal) => {
    removeModal(modal)
  }

  const [pulseState, setPulseState] = useState(false)

  useEffect(() => {
    if (pulseModal === id) {
      setPulseState(true)
    } else {
      setPulseState(false)
    }
  }, [pulseModal])

  return (
    <Draggable>
      <x.div
        w={120}
        p={4}
        bg={pulseState ? 'red' : 'gray-200'}
        position={'absolute'}
        pointerEvents={'all'}
      >
        <x.button onClick={() => handleCloseClick(modal)}>close</x.button>
        {modal.content.title}
      </x.div>
    </Draggable>
  )
}
