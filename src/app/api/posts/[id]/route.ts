// src/app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyTokenFromHeader } from "@/lib/auth";

export const runtime = "nodejs";

// DELETE /api/posts/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await verifyTokenFromHeader(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const result = await pool.query(
      `DELETE FROM "DB".posts
       WHERE post_id = $1 AND author_id = $2
       RETURNING post_id`,
      [id, user.userid]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Not found or no permission" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  } catch (err: any) {
    console.error("Delete post error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET /api/posts/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const result = await pool.query(
      `SELECT post_id, title, content, author_id, created_at
       FROM "DB".posts
       WHERE post_id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (err: any) {
    console.error("Error fetching post:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
