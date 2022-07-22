import * as React from 'react'
import { x } from '@xstyled/styled-components'
import { useModal } from '../providers/ModalProvider'
import { useViewportSize } from '../utils'
import Draggable from 'react-draggable'

const { useEffect, useState } = React

export default function Modal({ modal }) {
  const { removeModal, pulseModal } = useModal()
  const { id, type, content } = modal

  const [modalW, setModalW] = useState(320)
  const [modalH, setModalH] = useState(270)

  const { width, height } = useViewportSize()

  const assignCoord = (axis) => {
    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min
    const xMin = 16
    const xMax = width - modalW - 16
    const yMin = 48
    const yMax = height - modalH - 16
    if (axis == 'x') {
      return random(xMin, xMax)
    } else if (axis == 'y') {
      return random(yMin, yMax)
    }
  }

  const origin = {
    x: assignCoord('x'),
    y: assignCoord('y'),
  }

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
    <Draggable defaultPosition={{ x: origin.x, y: origin.y }}>
      <x.div
        w={modalW}
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
