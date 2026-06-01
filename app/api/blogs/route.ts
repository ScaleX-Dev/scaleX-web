import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import seedBlogs from "@/data/blogs.json";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  try {
    const db = await getDb();

    if (id) {
      const blog = await db.collection("blogs").findOne({ id });
      if (!blog) {
        const seed = (seedBlogs as Array<Record<string, unknown>>).find((b) => b.id === id);
        if (!seed) return NextResponse.json(null, { status: 404 });
        return NextResponse.json(seed);
      }
      const { _id, ...rest } = blog;
      void _id;
      return NextResponse.json(rest);
    }

    const blogs = await db
      .collection("blogs")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    if (blogs.length === 0) {
      return NextResponse.json(seedBlogs);
    }

    return NextResponse.json(blogs.map(({ _id, ...rest }) => { void _id; return rest; }));
  } catch {
    // DB unavailable — fall back to seed data
    if (id) {
      const seed = (seedBlogs as Array<Record<string, unknown>>).find((b) => b.id === id);
      if (!seed) return NextResponse.json(null, { status: 404 });
      return NextResponse.json(seed);
    }
    return NextResponse.json(seedBlogs);
  }
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

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  try {
    const db = await getDb();
    await db.collection("blogs").deleteOne({ id });
  } catch {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
