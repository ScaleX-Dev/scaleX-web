import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const db = await getDb();
  const id = req.nextUrl.searchParams.get("id");

  if (id) {
    const blog = await db.collection("blogs").findOne({ id: id });
    if (!blog) return NextResponse.json(null, { status: 404 });
    const { _id, ...rest } = blog;
    void _id;
    return NextResponse.json(rest);
  }

  const blogs = await db
    .collection("blogs")
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(blogs.map(({ _id, ...rest }) => { void _id; return rest; }));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const db = await getDb();

  await db.collection("blogs").updateOne(
    { id: String(body.id) },
    { $set: { ...body, id: String(body.id) } },
    { upsert: true }
  );

  return NextResponse.json({ success: true });
}
