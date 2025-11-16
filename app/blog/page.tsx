import React, { Suspense } from "react";
import BlogClient from "./BlogClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <BlogClient />
    </Suspense>
  );
}
