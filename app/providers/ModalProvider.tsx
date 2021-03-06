import * as React from 'react'
import { definitely } from '../utils'
import { Modal } from '../interfaces'

const { useEffect, useContext, useState } = React

interface ModalContextValue {
  modals: Modal[]
  addModals: (modals: Modal[]) => void
  removeModal: (modal: Modal) => void
  resetModals: () => void
  pulseModal: string
}

const ModalContext = React.createContext<ModalContextValue | undefined>({
  modals: [],
  addModals: (modals: Modal[]) => Promise<void>,
  removeModal: (modal: Modal) => Promise<void>,
  resetModals: () => Promise<void>,
  pulseModal: '',
})

export const ModalConsumer = ModalContext.Consumer

export const useModal = () => {
  const ctx = useContext(ModalContext)
  if (!ctx)
    throw new Error('useModalContext must be used within a ModalProvider')
  return ctx
}

interface Props {
  children: React.ReactNode
}

export const ModalProvider = ({ children }: Props) => {
  const ready = true
  const [modals, setModals] = useState<Modal[]>([])
  const [pulseModal, setPulseModal] = useState<string>('')
  const [quack, setQuack] = useState<HTMLAudioElement | null>(null)
  useEffect(() => setQuack(new Audio('/quack.mp3')), [])

  const addModals = (inputModals: Modal[]) => {
    const uniqueModals = inputModals.filter((m) => {
      return !modals.some((f) => {
        return f.id === m.id
      })
    })
    // if input length == 1 and modal is dup, send a pulse
    if (
      inputModals.length == 1 &&
      modals.some((m) => m.id == inputModals[0].id)
    ) {
      quack?.play()
      setPulseModal(inputModals[0].id)
      setTimeout(() => setPulseModal(''), 100)
    } else {
      setModals(modals.concat(uniqueModals))
    }
  }

  const removeModal = (modal: Modal) => {
    setModals(modals.filter((m) => m.id !== modal.id))
  }

  const resetModals = () => {
    setModals([])
  }

  const value = {
    ready,
    modals,
    addModals,
    removeModal,
    resetModals,
    pulseModal,
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
