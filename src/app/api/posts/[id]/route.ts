import pool from "@/lib/db";
import { verifyTokenFromHeader } from "@/lib/auth";

export const runtime = "nodejs";

// DELETE /api/posts/[id]
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const user = await verifyTokenFromHeader(req);
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { id } = await context.params; // ✅ await params

    const result = await pool.query(
      `DELETE FROM "DB".posts
       WHERE post_id = $1 AND author_id = $2
       RETURNING post_id`,
      [id, user.userid]
    );

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: "Not found or no permission" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Post deleted" }), { status: 200 });
  } catch (err) {
    console.error("Delete post error:", err);
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500 }
    );
  }
}
