import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import { SITE_NAME } from '../../lib/constants'
import { postQuery, postSlugsQuery, siteQuery } from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { sanityClient, getClient, overlayDrafts } from '../../lib/sanity.server'
import { GetStaticPaths, GetStaticProps } from 'next'

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
            <Head>
              <title>
                {post.title} | {SITE_NAME}
              </title>
              {post.coverImage && (
                <meta
                  key="ogImage"
                  property="og:image"
                  content={urlForImage(post.coverImage)
                    .width(1200)
                    .height(627)
                    .fit('crop')
                    .url()}
                />
              )}
            </Head>
            <PostHeader title={post.title} date={post.publishedAt} />
            <PostBody content={post.body} />
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
