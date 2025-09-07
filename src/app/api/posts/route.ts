import pool from "@/lib/db";
import { verifyTokenFromHeader } from "@/lib/auth";

export const runtime = "nodejs";

// GET /api/posts → fetch all posts
export async function GET() {
  try {
    const result = await pool.query(
      `SELECT p.post_id, p.title, p.content, p.created_at,
              u.user_name AS author
       FROM "DB".posts p
       JOIN "DB".users u ON p.author_id = u.userid
       ORDER BY p.created_at DESC`
    );

    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500 }
    );
  }
}

// POST /api/posts → create a new post
export async function POST(req: Request) {
  try {
    const user = await verifyTokenFromHeader(req);
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { title, content } = await req.json();

    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: "Title and content are required" }),
        { status: 400 }
      );
    }

    const result = await pool.query(
      `INSERT INTO "DB".posts (author_id, title, content)
       VALUES ($1, $2, $3)
       RETURNING post_id, title, content, created_at`,
      [user.userid, title, content]
    );

    return new Response(JSON.stringify(result.rows[0]), { status: 201 });
  } catch (err) {
    console.error("Error creating post:", err);
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500 }
    );
  }
}
