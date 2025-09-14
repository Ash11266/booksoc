"use client"

import { useEffect, useState } from "react"

interface Post {
  post_id: string
  title: string
  content: string
  created_at: string
}

interface User {
  userid: string
  username: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          setError("You must be logged in to view the dashboard.")
          setLoading(false)
          return
        }

        const res = await fetch("/api/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || "Failed to load dashboard")
        }

        const data = await res.json()
        setUser(data.user)
        setPosts(data.posts || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  return (
    <section className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-4">
        {user ? `Welcome, ${user.username} 👋` : "Your Dashboard 📊"}
      </h1>

      {loading && <p className="text-center text-gray-600">Loading dashboard...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && posts.length === 0 && (
        <p className="text-center text-gray-500">
          No posts yet. Start writing! ✍️
        </p>
      )}

      <div className="space-y-6 mt-6">
        {posts.map((post) => (
          <article
            key={post.post_id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-indigo-700">{post.title}</h2>
            <p className="text-gray-700 mt-2">{post.content}</p>
            <p className="text-sm text-gray-500 mt-4">
              Posted on {new Date(post.created_at).toLocaleString()}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
