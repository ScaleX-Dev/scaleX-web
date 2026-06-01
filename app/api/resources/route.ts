import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import seedResources from "@/data/resources.json";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  try {
    const db = await getDb();

    if (id) {
      const resource = await db.collection("resources").findOne({ id });
      if (!resource) {
        const seed = (seedResources as Array<Record<string, unknown>>).find((r) => r.id === id);
        if (!seed) return NextResponse.json(null, { status: 404 });
        return NextResponse.json(seed);
      }
      const { _id, ...rest } = resource;
      void _id;
      return NextResponse.json(rest);
    }

    const resources = await db
      .collection("resources")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    if (resources.length === 0) {
      return NextResponse.json(seedResources);
    }

    return NextResponse.json(resources.map(({ _id, ...rest }) => { void _id; return rest; }));
  } catch {
    // DB unavailable — fall back to seed data
    if (id) {
      const seed = (seedResources as Array<Record<string, unknown>>).find((r) => r.id === id);
      if (!seed) return NextResponse.json(null, { status: 404 });
      return NextResponse.json(seed);
    }
    return NextResponse.json(seedResources);
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const db = await getDb();

  await db.collection("resources").updateOne(
    { id: String(body.id) },
    { $set: { ...body, id: String(body.id) } },
    { upsert: true }
  );

  return NextResponse.json({ success: true });
}
