import * as React from 'react'
import { SiteSettings } from '../interfaces'
import { definitely } from '../utils'

const { useContext } = React

interface SiteDataContextValue {
  ready: boolean
  siteSettings?: SiteSettings
}

const SiteDataContext = React.createContext<SiteDataContextValue | undefined>(
  undefined,
)

export const SiteDataConsumer = SiteDataContext.Consumer

export const useSiteData = () => {
  const ctx = useContext(SiteDataContext)
  if (!ctx)
    throw new Error('useSiteDataContext must be used within a SiteDataProvider')
  return ctx
}

interface Props {
  children: React.ReactNode
  siteData: any
}

export const SiteDataProvider = ({ children, siteData }: Props) => {
  const ready = true
  const siteSettings = siteData

  const value = {
    ready,
    siteSettings,
  }

  return (
    <SiteDataContext.Provider value={value}>
      {children}
    </SiteDataContext.Provider>
  )
}
