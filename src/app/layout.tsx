import "./globals.css"
import Navbar from "@/components/Navbar"
import Image from "next/image"

export const metadata = {
  title: "Booksoc",
  description: "Read and share blogs with the Booksoc community",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>

        {/* Footer with SAASC logo */}
        <footer className="bg-black text-gray-300 text-center py-6 mt-8">
          <div className="flex flex-col items-center space-y-3">
            <Image
              src="/saasclogo.jpeg"
              alt="SAASC Logo"
              width={120}
              height={120}
            />
            <p>© {new Date().getFullYear()} Booksoc | A SAASC Initiative</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
