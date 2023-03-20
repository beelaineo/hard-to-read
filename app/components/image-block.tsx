import * as React from 'react'
import ReactDOM from 'react-dom'
import styled, { css, x } from '@xstyled/styled-components'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageAsset } from '../interfaces'
import SanityImage from './sanity-image'
import { sanityClient } from '../lib/sanity.server'

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
  console.log('content', content)
  const { related, caption, alt } = content

  return (
    <Wrapper>
      <SanityImage image={content.asset} caption={caption} alt={alt} />
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
