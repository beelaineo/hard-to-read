import * as React from 'react'
import ReactDOM from 'react-dom'
import Image from 'next/image'
import styled, { css } from '@xstyled/styled-components'
import { SanityImageAsset } from '../interfaces'

const Wrapper = styled.div`
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
`

const TextWrapper = styled.div`
  margin: 0px;
  padding: 0;
  width: auto;
`

export const ImageBlock = ({ content }) => {
  const { related } = content
  const { assetId, metadata, originalFilename, uploadId, url } = content.asset
  const width = metadata.dimensions.width
  const height = metadata.dimensions.height
  const ratio = metadata.dimensions.aspectRatio

  console.log('image', content)
  return (
    <Wrapper>
      <Image src={url} width={width} height={height} />
    </Wrapper>
  )
}
