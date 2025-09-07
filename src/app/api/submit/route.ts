import { verifyTokenFromHeader } from "@/lib/auth";
import pool from "@/lib/db";

export const runtime = "nodejs";

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
