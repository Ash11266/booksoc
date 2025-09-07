import pool from "@/lib/db";
import { verifyTokenFromHeader } from "@/lib/auth";

export const runtime = "nodejs";

// GET /api/dashboard → fetch logged-in user's posts
export async function GET(req: Request) {
  try {
    const user = await verifyTokenFromHeader(req);
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const result = await pool.query(
      `SELECT post_id, title, content, created_at
       FROM "DB".posts
       WHERE author_id = $1
       ORDER BY created_at DESC`,
      [user.userid]
    );

    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (err) {
    console.error("Dashboard fetch error:", err);
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500 }
    );
  }
}
