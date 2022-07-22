import * as React from 'react'
import { x } from '@xstyled/styled-components'
import { useModal } from '../providers/ModalProvider'
import Draggable from 'react-draggable'

export default function Modal({ modal }) {
  const { removeModal } = useModal()
  const { id, type, content } = modal

  const handleCloseClick = (modal) => {
    removeModal(modal)
  }

  return (
    <Draggable>
      <x.div
        w={120}
        p={4}
        bg={'gray-200'}
        position={'absolute'}
        pointerEvents={'all'}
      >
        <x.button onClick={() => handleCloseClick(modal)}>close</x.button>
        {modal.content.title}
      </x.div>
    </Draggable>
  )
}
