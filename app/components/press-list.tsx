import { x } from '@xstyled/styled-components'
import * as React from 'react'
import { format } from 'date-fns'

export default function PressList({ pressDocs }) {
  return (
    <div>
      {pressDocs.map((post) => {
        return (
          <x.div
            key={post._id}
            display={{ _: 'flex', sm: 'grid' }}
            flexWrap={'wrap'}
            gridTemplateColumns={{ sm: 6, md: 9, lg: 10 }}
            columnGap={{ _: 2, sm: 8 }}
            rowGap={1}
            fontSize={'lg'}
            my={4}
          >
            <x.div
              gridColumn={{
                sm: 'span 1',
                md: '2 / 4',
                lg: '2 / 4',
              }}
              flex={0.25}
              textAlign={{ _: 'left', md: 'right' }}
              color={'primary'}
            >
              {format(new Date(post.date), 'MMM yyyy')}
            </x.div>
            <x.div
              gridColumn={{
                sm: 'span 3',
                md: '4 / 7',
                lg: '4 / 8',
              }}
              flex={'100%'}
              order={{ _: 1, sm: 0 }}
            >
              {post.title}
            </x.div>
            <x.div
              gridColumn={{
                sm: 'span 1',
                md: '7 / 9',
                lg: '8 / 10',
              }}
              flex={0.625}
              fontStyle={'italic'}
              color={'primary'}
            >
              {post.publication}
            </x.div>
            {post.link ? (
              <x.a
                gridColumn={{
                  sm: 'span 1',
                  md: '9 / 10',
                  lg: 'span 1 / 11',
                }}
                flex={0.125}
                textAlign={'right'}
                href={post.link}
                target={'_blank'}
                color={'primary'}
              >
                Link
              </x.a>
            ) : post.clipping ? (
              <x.a
                gridColumn={{
                  sm: 'span 1',
                  md: '9 / 10',
                  lg: 'span 1 / 11',
                }}
                flex={0.125}
                textAlign={'right'}
                href={post.clipping.asset.url}
                target={'_blank'}
                color={'primary'}
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
