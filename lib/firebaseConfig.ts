// src/firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, getDocs, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Only initialize when a valid API key is present.
// During Next.js static prerendering the NEXT_PUBLIC_* vars may be absent,
// so we skip initialization to avoid a FirebaseError at build time.
const hasConfig = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const app = hasConfig
  ? (!getApps().length ? initializeApp(firebaseConfig) : getApp())
  : null;

// Cast to the real types — all usages are inside useEffect / event handlers
// (client-only), so these will never be null at runtime.
const db = app ? getFirestore(app) : null as unknown as ReturnType<typeof getFirestore>;
const auth = app ? getAuth(app) : null as unknown as ReturnType<typeof getAuth>;
const storage = app ? getStorage(app) : null as unknown as ReturnType<typeof getStorage>;

export { app, auth, db, storage, collection, getDocs, onSnapshot };
