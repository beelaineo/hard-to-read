import * as React from 'react'
import ReactDOM from 'react-dom'
import Image from 'next/image'
import styled, { css, x } from '@xstyled/styled-components'
import { SanityImageAsset } from '../interfaces'

const Wrapper = styled.figure`
  height: auto;
  position: relative;
  width: 100%;
  display: block;
  position: relative;
  padding: 0;
  line-height: 0;
  img {
    pointer-events: none;
  }
  figcaption {
    backdrop-filter: blur(2px);
    background-color: primary30;
    line-height: 1.1;
  }
`

const TextWrapper = styled.div`
  margin: 0px;
  padding: 0;
  width: auto;
`

export const ImageBlock = ({ content }) => {
  const { related, caption, alt } = content
  const { assetId, metadata, originalFilename, uploadId, url } = content.asset
  const width = metadata.dimensions.width
  const height = metadata.dimensions.height
  const ratio = metadata.dimensions.aspectRatio

  return (
    <Wrapper>
      <Image
        src={url}
        width={width}
        height={height}
        alt={alt || caption || 'image'}
        loading="lazy"
      />
      {caption && (
        <x.figcaption
          position={'absolute'}
          color={'white'}
          px={2}
          py={3}
          w={'100%'}
          bottom={0}
          fontSize={12}
        >
          {caption}
        </x.figcaption>
      )}
    </Wrapper>
  )
}
