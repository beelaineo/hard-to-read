import Container from './container'
import Link from 'next/link'
import { useSiteData } from '../providers/SiteDataProvider'

export default function Footer() {
  const siteData = useSiteData()
  console.log('siteData', siteData)
  const socials = siteData?.siteSettings?.socials ?? []

  return (
    <footer className="fixed bottom-0 left-0 right-0 grid grid-cols-10 gap-px bg-black p-px">
      <section className="col-span-3 p-4 bg-gray-200">
        <nav className="flex flex-col">
          <Link href="/blog">
            <a className="underline">Blog</a>
          </Link>
          <Link href="/about">
            <a className="underline">About</a>
          </Link>
        </nav>
      </section>
      <section className="col-span-4 p-4 bg-white">
        <nav className="flex flex-col">
          <Link href="/events">
            <a className="underline">Events</a>
          </Link>
          <Link href="/exhibitions">
            <a className="underline">Exhibitions</a>
          </Link>
          <Link href="/people">
            <a className="underline">People</a>
          </Link>
          <Link href="/themes">
            <a className="underline">Themes</a>
          </Link>
          <Link href="/partners">
            <a className="underline">Partners</a>
          </Link>
        </nav>
      </section>
      <section className="col-span-3 p-4 bg-white">
        {socials && socials.length > 0 ? (
          <nav className="flex flex-col">
            {socials.map((s) => {
              return (
                <a className="underline" key={s._key} href={s.url}>
                  {s.title}
                </a>
              )
            })}
          </nav>
        ) : null}
      </section>
    </footer>
  )
}
