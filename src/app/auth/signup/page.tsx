"use client";

import { useState } from "react";
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name: userName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      // Success → redirect to login
      alert("Account created successfully🎉");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

    router.push("/dashboard");
      /*router.push("/auth/login");*/
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
            id="username"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
            id="email"
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
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm font-medium text-center">{error}</p>
        )}

        {/* Signup Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Signup"}
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
  );
}
