import pool from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

// POST /api/auth/login
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400 }
      );
    }

    // Find user by email (case-insensitive)
    const result = await pool.query(
      `SELECT userid, user_name, email, password
       FROM "DB".users
       WHERE LOWER(email) = LOWER($1)`,
      [email]
    );

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    }

    const user = result.rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid password" }), { status: 401 });
    }

    // Sign JWT
    const token = jwt.sign(
      { userid: user.userid, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7h" }
    );

    // Return token + user info
    return new Response(
      JSON.stringify({
        token,
        user: {
          userid: user.userid,
          user_name: user.user_name,
          email: user.email,
        },
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Login error:", err);
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500 }
    );
  }
}
