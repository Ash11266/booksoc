"use client"

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-200 via-yellow-100 to-amber-200 text-gray-900 py-20 rounded-b-3xl shadow-md">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-6">
            Welcome to <span className="text-orange-700">Booksoc</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-700">
            A cozy community for readers and writers. Share your stories, read
            others’, and get inspired ✨
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="/submit"
              className="bg-orange-600/90 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition shadow-md"
            >
              Write a Blog
            </a>
            <a
              href="/auth/signup"
              className="bg-amber-500/90 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition shadow-md"
            >
              Join Now
            </a>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-orange-700 mb-8 text-center">
          Latest Blogs ✍️
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((blog) => (
            <div
              key={blog}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6 border border-orange-200"
            >
              <h3 className="text-xl font-semibold text-orange-800 mb-3">
                Blog Title {blog}
              </h3>
              <p className="text-gray-600 mb-4">
                A short description of the blog goes here. Catch the reader’s
                attention with a preview.
              </p>
              <a
                href="#"
                className="text-orange-600 font-medium hover:underline"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
