import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/mongodb";

// Protect this route with a secret — call once to create admin users, then remove or disable
export async function POST(req: NextRequest) {
  const { secret, email, password, name, designation } = await req.json();

  if (secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!email || !password || !name) {
    return NextResponse.json({ error: "email, password and name are required" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 12);
  const db = await getDb();

  await db.collection("admins").updateOne(
    { email: email.toLowerCase() },
    { $set: { email: email.toLowerCase(), password: hashed, name, designation: designation || "" } },
    { upsert: true }
  );

  return NextResponse.json({ success: true, message: `Admin ${email} saved.` });
}
