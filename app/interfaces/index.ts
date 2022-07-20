// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//

import {
  Event,
  Person,
  Post,
  Place,
  Press,
  Theme,
  SanityImageAsset,
  BlockContent,
} from './sanity'

// import { User } from 'path/to/interfaces';
export * from './sanity'

export type User = {
  id: number
  name: string
}

export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}

export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { [key: string]: any }
}

export type RelatedType = (Event | Person | Post | Place | Press | Theme)[]

export type MuxVideoAsset = {
  _createdAt: string
  _id: string
  _rev: string
  _type: 'mux.videoAsset'
  _updatedAt: string
  assetId: string
  playbackId: string
  status: string
  uploadId: string
  data: Object
}

export type MuxVideoBlock = {
  _id: string
  _key: string
  _type: 'video'
  asset: MuxVideoAsset
  related: RelatedType
}

export type ImageBlock = {
  _id: string
  _key: string
  _type: 'image'
  asset: SanityImageAsset
  related: RelatedType
}

export type TextAttachmentBlock = {
  _key: string
  _type: 'textAttachment'
  title?: string
  body?: BlockContent
}
