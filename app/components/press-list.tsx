import { x } from '@xstyled/styled-components'
import * as React from 'react'

export default function PressList({ pressDocs }) {
  return (
    <div>
      {pressDocs.map((post) => {
        return (
          <x.div
            key={post._id}
            display={{ _: 'grid', sm: 'grid' }}
            gridTemplateColumns={{ _: 8, sm: 6, md: 9, lg: 10 }}
            columnGap={{ _: 2, sm: 8 }}
            my={4}
          >
            <x.div
              gridColumn={{
                _: 'span 2',
                sm: 'span 1',
                md: '2 / 4',
                lg: '2 / 4',
              }}
              textAlign={{ _: 'left', md: 'right' }}
            >
              {post.date}
            </x.div>
            <x.div
              gridColumn={{
                _: 'span 3',
                sm: 'span 3',
                md: '4 / 7',
                lg: '4 / 8',
              }}
            >
              {post.title}
            </x.div>
            <x.div
              gridColumn={{
                _: 'span 2',
                sm: 'span 1',
                md: '7 / 9',
                lg: '8 / 10',
              }}
            >
              {post.publication}
            </x.div>
            {post.link ? (
              <x.a
                gridColumn={{
                  _: 'span 1',
                  sm: 'span 1',
                  md: '9 / 10',
                  lg: 'span 1 / 11',
                }}
                textAlign={'right'}
                href={post.link}
                target={'_blank'}
              >
                Link
              </x.a>
            ) : post.clipping ? (
              <x.a
                gridColumn={{
                  _: 'span 1',
                  sm: 'span 1',
                  md: '9 / 10',
                  lg: 'span 1 / 11',
                }}
                textAlign={'right'}
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
