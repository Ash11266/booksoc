"use client"

import { useState } from "react"
import Link from "next/link"

export default function SignupPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Signup:", { username, email, password })
    alert("Account created successfully 🎉")
    setUsername("")
    setEmail("")
    setPassword("")
  }

  return (
    <section className="max-w-md mx-auto py-12">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
        Signup 📝
      </h1>

      <form
        onSubmit={handleSignup}
        className="bg-white shadow-md rounded-lg p-6 space-y-6"
      >
        {/* Username */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        {/* Signup Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Signup
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </section>
  )
}
