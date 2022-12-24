import * as React from 'react'
import ReactDOM from 'react-dom'
import styled, { css, x } from '@xstyled/styled-components'
import { Post as PostType, SanityImage } from '../interfaces'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { postBlockDate, modalize } from '../utils'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import { useModal } from '../providers/ModalProvider'
import Link from 'next/link'

const Wrapper = styled.div`
  height: auto;
  min-height: 240px;
  position: relative;
  width: 100%;
  display: block;
  position: relative;
  background-color: primary20;
  padding: 6;
`

const TextWrapper = styled.div`
  margin: 0px;
  padding: 0;
  width: auto;
`

interface PostBlockProps {
  content: PostType
}

export const PostBlock = ({ content }: PostBlockProps) => {
  const {
    title,
    slug,
    publishedAt,
    _updatedAt,
    _createdAt,
    body,
    themes,
    _id,
  } = content
  const { addModals } = useModal()
  const curClient = getClient(false)

  const ptComponents: PortableTextComponents = {
    marks: {
      internalLink: ({ children, value }) => {
        const handleItemClick = async (value) => {
          const doc = await curClient.fetch(
            `*[_id == "${value.reference._ref}"][0]`,
          )
          addModals([modalize(doc)])
          console.log('refDoc', doc)
        }
        return (
          <x.a
            textDecoration={'underline'}
            zIndex={1}
            onClick={() => handleItemClick(value)}
            onMouseDown={(e) => e.stopPropagation()}
            color={'secondary'}
          >
            {children}
          </x.a>
        )
      },
    },
  }

  return (
    <Wrapper>
      <h2>{title}</h2>
      <div>{postBlockDate(publishedAt)}</div>
      <TextWrapper>
        {body ? (
          <PortableText value={body[0]} components={ptComponents} />
        ) : null}
      </TextWrapper>
      <Link href={`/blog/${slug?.current}`}>
        <x.a
          pt={4}
          display={'inline-block'}
          textDecoration={'underline'}
          color={'primary'}
        >
          Read more
        </x.a>
      </Link>
    </Wrapper>
  )
}
