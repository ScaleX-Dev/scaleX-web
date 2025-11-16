'use client'
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Metadata from "@/components/Metadata";

import BookingCalendar from '@/components/BookingCalendar';

const AppointmentScheduler = () => {
  return (
    <div className="flex flex-col min-h-screen">
        <Metadata
            title="Book an Appointment - ScaleX"
            description="Schedule a meeting with the ScaleX team to discuss your business growth."
        />
      <Navbar />

      {/* Background Shape */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#646464] to-[#00ff81] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>

      {/* Appointment Scheduler */}
      <div className="max-w-6xl mx-auto mt-28 mb-20">
        <h1 className="text-3xl font-bold text-center mb-8">Book an Appointment</h1>
        <BookingCalendar />
      </div>

      <Footer />
    </div>
  );
};

export default AppointmentScheduler;
