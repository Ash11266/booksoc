"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface Post {
  post_id: string;
  title: string;
  content: string;
  created_at: string;
}

interface User {
  userid: string;
  username: string;
}

export default function DashboardPage() {
  const { isLoggedIn, isAuthReady, logout } = useAuth();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔐 Route protection
  useEffect(() => {
    if (!isAuthReady) return; 
    if (!isLoggedIn) {
      router.push("/auth/login");
    }
  }, [isLoggedIn, isAuthReady, router]);

  // 🔄 Fetch dashboard data
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // ⏰ TOKEN EXPIRED HANDLING
        if (res.status === 401) {
          logout();
          return;
        }

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to load dashboard");
        }

        const data = await res.json();
        setUser(data.user);
        setPosts(data.posts || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [isLoggedIn, logout]);

  // 🚫 Prevent flash
  if (!isLoggedIn) return null;

  return (
    <section className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-4">
        {user ? `Welcome, ${user.username} 👋` : "Your Dashboard 📊"}
      </h1>

      {loading && (
        <p className="text-center text-gray-600">Loading dashboard...</p>
      )}
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
            <h2 className="text-xl font-semibold text-indigo-700">
              {post.title}
            </h2>
            <p className="text-gray-700 mt-2">{post.content}</p>
            <p className="text-sm text-gray-500 mt-4">
              Posted on {new Date(post.created_at).toLocaleString()}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
