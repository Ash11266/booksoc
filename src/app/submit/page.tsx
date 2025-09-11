"use client"

import { useState } from "react"

export default function SubmitPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitted Blog:", { title, content })
    alert("Your blog has been submitted! 🚀")
    setTitle("")
    setContent("")
  }

  return (
    <section className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
        Submit Your Blog ✍️
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Blog Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your blog title"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Blog Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog here..."
            rows={6}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Submit Blog
        </button>
      </form>
    </section>
  )
}
