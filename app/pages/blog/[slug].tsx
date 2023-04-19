import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import BlogPost from '../../components/blog-post'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import { postQuery, postSlugsQuery, siteQuery } from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { sanityClient, getClient, overlayDrafts } from '../../lib/sanity.server'
import { GetStaticPaths, GetStaticProps } from 'next'
import * as React from 'react'
import { NextSeo } from 'next-seo'

const Post = ({ data, preview }) => {
  const router = useRouter()

  const slug = data?.post?.slug
  const {
    data: { post, siteData },
  } = usePreviewSubscription(postQuery, {
    params: { slug },
    initialData: data,
    enabled: preview && slug,
  })

  const defaults = { nonTextBehavior: 'remove' }
  const blocksToText = (blocks, opts = {}) => {
    const options = Object.assign({}, defaults, opts)
    return blocks
      .map((block) => {
        if (block._type !== 'block' || !block.children) {
          return options.nonTextBehavior === 'remove'
            ? ''
            : `[${block._type} block]`
        }

        return block.children.map((child) => child.text).join('')
      })
      .join('\n\n')
  }

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : post ? (
          <article>
            <NextSeo
              title={`${post.title} | Hard to Read`}
              description={blocksToText(post.body)}
              openGraph={{
                url: `https://hardtoread.us/blog/${post.slug}`,
                title: post.title,
                description: siteData.description,
                type: 'article',
                article: {
                  publishedTime: post.publishedAt,
                  modifiedTime: post._updatedAt,
                },
                ...(post.coverImage?.url && {
                  images: [
                    {
                      url: urlForImage(post.coverImage.url)
                        .width(850)
                        .height(650)
                        .fit('crop')
                        .crop('focalpoint')
                        .focalPoint(
                          post.coverImageHotspot.x,
                          post.coverImageHotspot.y,
                        )
                        .url(),
                      width: 850,
                      height: 650,
                      alt: post.title,
                    },
                  ],
                }),
              }}
            />
            <BlogPost post={post} />
          </article>
        ) : null}
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const [post, siteData] = await Promise.all([
    await getClient(preview).fetch(postQuery, {
      slug: params?.slug,
    }),
    await getClient(preview).fetch(siteQuery),
  ])
  return {
    props: {
      preview,
      data: {
        post,
        siteData,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await sanityClient.fetch(postSlugsQuery)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}
export default Post
