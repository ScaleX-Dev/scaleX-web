"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Metadata from "@/components/Metadata";
import Link from "next/link";

import { useSearchParams } from "next/navigation";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const submitted = searchParams.get("submitted");

  const isSubmitted = submitted?.toLowerCase() === "true";

  if (typeof window !== "undefined" && !isSubmitted) {
    window.location.replace("/");
    return null;
  }
  return (
    <>
      <Metadata
        title="Thank you — ScaleX"
        description="Thanks for reaching out. We'll be in touch soon — ScaleX."
      />

      <Navbar />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#646464] to-[#00ff81] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <main className="bg-[#fafafa3c] min-h-[60vh] flex items-center">
        <div className="mx-auto max-w-3xl text-center py-36 px-6">
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900">
            Thank you!
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            We received your appointment and will get back to you within 1–2
            business days. In the meantime, feel free to browse our latest
            projects or read our blog.
          </p>

          <p className="mt-6 text-lg text-gray-600">
            Please check your email for a confirmation of your appointment
            request.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 rounded-full bg-primary-green text-black hover:bg-green-300"
            >
              Back to Home
            </Link>

            <Link
              href="/appointments"
              className="px-6 py-3 rounded-full border border-gray-300 text-gray-700"
            >
              Book An Appointment Again
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
