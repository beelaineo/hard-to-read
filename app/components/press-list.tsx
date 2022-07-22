import { x } from '@xstyled/styled-components'
import * as React from 'react'
import { urlForImage, usePreviewSubscription } from '../lib/sanity'
import { sanityClient, getClient, overlayDrafts } from '../lib/sanity.server'
const { useEffect, useState } = React

export default function PressList({ pressDocs }) {
  return (
    <div>
      {pressDocs.map((post) => {
        return (
          <x.div
            key={post._id}
            display={'grid'}
            gridTemplateColumns={'10'}
            my={4}
          >
            <x.div gridColumn={'3 / 4'}>{post.date}</x.div>
            <x.div gridColumn={'4 / 8'}>{post.title}</x.div>
            <x.div gridColumn={'8 / 10'}>{post.publication}</x.div>
            {post.link ? (
              <x.a
                gridColumn={'span 1 / 11'}
                px={5}
                href={post.link}
                target={'_blank'}
              >
                Link
              </x.a>
            ) : post.clipping ? (
              <x.a
                gridColumn={'span 1 / 11'}
                px={5}
                href={post.clipping.asset.url}
                target={'_blank'}
              >
                PDF
              </x.a>
            ) : null}
          </x.div>
        )
      })}
    </div>
  )
}
