import { NextResponse } from "next/server";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, query, where, orderBy, limit as fsLimit, getDocs } from "firebase/firestore";

function getClientDb() {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  return getFirestore(app);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const limitCount = parseInt(searchParams.get("limit") || "50", 10);

  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    return NextResponse.json({ error: "Firebase not configured" }, { status: 500 });
  }

  try {
    const db = getClientDb();
    const ref = collection(db, "resources");

    const q =
      type && type !== "all"
        ? query(ref, where("type", "==", type), orderBy("createdAt", "desc"), fsLimit(limitCount))
        : query(ref, orderBy("createdAt", "desc"), fsLimit(limitCount));

    const snapshot = await getDocs(q);
    const resources = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
      createdAt: (d.data().createdAt as { toDate?: () => Date })?.toDate?.()?.toISOString?.() ?? null,
    }));

    return NextResponse.json({ resources }, { status: 200 });
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
  }
}
