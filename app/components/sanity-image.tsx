import * as React from 'react'
import {
  SanityImageAsset,
  SanityReference,
  SanityImageCrop,
  SanityImageHotspot,
} from 'sanity-codegen'
import Img from 'next/image'
import { useNextSanityImage, UseNextSanityImageProps } from 'next-sanity-image'
import sanityClient from '../sanityClient'

interface SanityImageProps {
  image: SanityImageAsset
  caption?: string
  alt?: string
  className?: string
  width?: number
}

const SanityImage = ({ image, caption, alt, className }: SanityImageProps) => {
  const imgProps: UseNextSanityImageProps = useNextSanityImage(
    sanityClient,
    image,
  )

  console.log('SANITY IMAGE', image)

  const { assetId, metadata, originalFilename, uploadId, url } = image

  return (
    <Img
      {...imgProps}
      sizes="(max-width: 767px) 100vw, 40vw"
      alt={alt || caption || 'image'}
      style={{ width: '100%', height: 'auto' }}
      className={className}
      loading="lazy"
      placeholder={'blur'}
      blurDataURL={metadata.lqip}
      draggable={false}
    />
  )
}

export default SanityImage
