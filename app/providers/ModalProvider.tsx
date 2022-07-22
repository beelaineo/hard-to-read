import * as React from 'react'
import { definitely } from '../utils'
import { Modal } from '../interfaces'

const { useEffect, useContext, useState } = React

interface ModalContextValue {
  modals: Modal[]
  addModals: (modals: Modal[]) => void
  removeModal: (modal: Modal) => void
}

const ModalContext = React.createContext<ModalContextValue | undefined>({
  modals: [],
  addModals: (modals: Modal[]) => Promise<void>,
  removeModal: (modal: Modal) => Promise<void>,
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

  const addModals = (inputModals: Modal[]) => {
    console.log('inputModals', inputModals)
    const uniqueModals = inputModals.filter((m) => {
      return !modals.some((f) => {
        return f.id === m.id
      })
    })
    console.log('uniqueModals', uniqueModals)
    setModals(modals.concat(uniqueModals))
  }

  const removeModal = (modal: Modal) => {
    setModals(modals.filter((m) => m.id !== modal.id))
  }

  const value = {
    ready,
    modals,
    addModals,
    removeModal,
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
