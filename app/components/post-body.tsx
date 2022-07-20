import { PortableText } from '@portabletext/react'

export default function PostBody({ content }) {
  return (
    <div className={`max-w-2xl mx-auto`}>
      <PortableText value={content} />
    </div>
  )
}