import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Container from '../../components/container'
import Layout from '../../components/layout'
import Post from '../../components/blog-post'
import Image from 'next/image'
import { blogQuery, siteQuery, blogPopupsQuery } from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import * as React from 'react'
import { x } from '@xstyled/styled-components'
import { NextSeo } from 'next-seo'
import { definitely, modalize } from '../../utils'
import { useModal } from '../../providers/ModalProvider'

const { useEffect } = React

export default function Index({ allPosts, popups, preview }) {
  const { addModals } = useModal()

  useEffect(() => {
    if (!popups) return
    const modals = popups.map((m) => modalize(m))
    addModals(modals)
  }, [])

  return (
    <>
      <Layout preview={preview}>
        <NextSeo
          title="Blog | Hard to Read"
          openGraph={{
            url: 'https://hardtoread.us/blog',
            title: 'Blog',
          }}
        />
        <Container>
          {allPosts.map((post, i) => (
            <>
              {i > 0 ? (
                <x.hr
                  my={12}
                  h={'2px'}
                  maxW={800}
                  backgroundColor={'primary'}
                />
              ) : null}
              <Post key={post.slug} post={post} />
            </>
          ))}
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const [allPosts, popups, siteData] = await Promise.all([
    overlayDrafts(await getClient(preview).fetch(blogQuery)),
    await getClient(preview).fetch(blogPopupsQuery),
    await getClient(preview).fetch(siteQuery),
  ])
  return {
    props: { allPosts, popups, siteData, preview },
  }
}
