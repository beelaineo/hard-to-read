import * as React from 'react'
import { SiteSettings } from '../interfaces'
import { SiteDataProvider } from './SiteDataProvider'
// import { ErrorDisplay, ErrorProvider } from './ErrorProvider'
// import { NavigationProvider } from './NavigationProvider'

/**
 * App
 *
 * - Top-level Providers
 * - Global Components
 * - Routes
 */

interface Props {
  children: React.ReactNode
  siteData: SiteDataResponse
}

export interface SiteDataResponse extends SiteSettings {}

export const Providers = ({ siteData, children }: Props) => {
  return <SiteDataProvider siteData={siteData}>{children}</SiteDataProvider>
}
