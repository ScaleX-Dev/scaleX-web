import React, { Suspense } from "react";
import ResourcesClient from "./ResourcesClient";

export default function ResourcesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#00ff81] border-t-transparent animate-spin" />
        </div>
      }
    >
      <ResourcesClient />
    </Suspense>
  );
}
