import Container from './container'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 grid grid-cols-10 gap-px bg-black p-px">
      <section className="col-span-3 p-4 bg-gray-200">
        <nav className="flex flex-col">
          <Link href="/blog"><a className='underline'>Blog</a></Link>
          <Link href="/about"><a className='underline'>About</a></Link>
        </nav>
      </section>
      <section className="col-span-4 p-4 bg-white">
        <nav className="flex flex-col">
          <Link href="/events"><a className='underline'>Events</a></Link>
          <Link href="/exhibitions"><a className='underline'>Exhibitions</a></Link>
          <Link href="/people"><a className='underline'>People</a></Link>
          <Link href="/themes"><a className='underline'>Themes</a></Link>
          <Link href="/partners"><a className='underline'>Partners</a></Link>
        </nav>
      </section>
      <section className="col-span-3 p-4 bg-white">
        <nav className="flex flex-col">
          <a className="underline">Instagram</a>
          <a className="underline">Youtube</a>
          <a className="underline">Soundcloud</a>
          <a className="underline">Mailing List</a>
        </nav>
      </section>
    </footer>
  )
}