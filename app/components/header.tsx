import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 m-4">
      <h1 className="grid grid-cols-10 text-xl md:text-2xl leading-tight">
        <Link href="/">
          <a className="col-span-3 hover:underline">Hard</a>
        </Link>
        <Link href="/">
          <a className="col-span-4 hover:underline">to</a>
        </Link>
        <Link href="/">
          <a className="col-span-3 hover:underline">Read</a>
        </Link>
      </h1>
    </header>
  )
}
