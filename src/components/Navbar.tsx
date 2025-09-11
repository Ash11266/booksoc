import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  return (
    <nav className="bg-black shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Left side: Booksoc logo */}
        <Link href="/">
          <Image
            src="/booksoclogo.jpeg"
            alt="Booksoc Logo"
            width={80}
            height={80}
            priority
          />
        </Link>

        {/* Right side navigation */}
        <div className="space-x-6 text-white font-medium">
          <Link href="/" className="hover:text-yellow-400">Home</Link>
          <Link href="/submit" className="hover:text-yellow-400">Submit</Link>
          <Link href="/auth/login" className="hover:text-yellow-400">Login</Link>
          <Link href="/auth/signup" className="hover:text-yellow-400">Signup</Link>
        </div>
      </div>
    </nav>
  )
}
