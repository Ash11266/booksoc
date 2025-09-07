import pool from "@/lib/db";
import bcrypt from "bcrypt";

export const runtime = "nodejs";

// POST /api/auth/signup
export async function POST(req: Request) {
  try {
    const { user_name, email, password } = await req.json();

    if (!user_name || !email || !password) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await pool.query(
      `INSERT INTO "DB".users (userid, user_name, email, password, creation_time, creation_date)
       VALUES (gen_random_uuid(), $1, $2, $3, NOW(), current_date)
       RETURNING userid, user_name, email`,
      [user_name, email.toLowerCase(), hashedPassword] // lowercase email for consistency
    );

    return new Response(JSON.stringify(result.rows[0]), { status: 201 });
  } catch (err: any) {
    console.error("Signup error:", err);

    // Handle duplicate email
    if (err.code === "23505") {
      return new Response(JSON.stringify({ error: "Email already exists" }), { status: 409 });
    }

    return new Response(
      JSON.stringify({ error: err.message || "Server error" }),
      { status: 500 }
    );
  }
}
