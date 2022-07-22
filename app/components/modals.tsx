import * as React from 'react'
import { x } from '@xstyled/styled-components'
import Modal from './modal'
import { useModal } from '../providers/ModalProvider'

export default function Modals() {
  const { modals } = useModal()
  return (
    <x.div
      position={'fixed'}
      top={0}
      bottom={0}
      left={0}
      right={0}
      pointerEvents={'none'}
    >
      {modals.map((modal) => (
        <Modal key={modal.id} modal={modal} />
      ))}
    </x.div>
  )
}
