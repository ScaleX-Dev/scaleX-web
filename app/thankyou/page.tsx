import React, { Suspense } from "react";
import ThankYouClient from "./ThankYouClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center">Loading...</div>}>
      <ThankYouClient />
    </Suspense>
  );
}
