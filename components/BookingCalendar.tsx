'use client';

import { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, isBefore } from 'date-fns';
import BookingModal from './BookingModal';

// Sri Lanka is UTC+5:30
const SL_OFFSET_MS = 5.5 * 60 * 60 * 1000;

// Generate slot Date objects (UTC) for a given SL date string (YYYY-MM-DD).
// Slots run 8:00 AM – 8:00 PM SL time at 45-minute intervals.
function generateSLSlots(slDateStr: string): Date[] {
  const [year, month, day] = slDateStr.split('-').map(Number);
  const slots: Date[] = [];
  let totalMinutes = 8 * 60; // start at 08:00 SL
  const lastSlotMinutes = 19 * 60 + 15; // last slot 19:15 (ends at 20:00)
  while (totalMinutes <= lastSlotMinutes) {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    slots.push(new Date(Date.UTC(year, month - 1, day, h, m, 0) - SL_OFFSET_MS));
    totalMinutes += 30;
  }
  return slots;
}

export default function BookingCalendar() {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const [busyTimes, setBusyTimes] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<Date | null>(null);

  const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Fetch busy times for the selected SL date
  useEffect(() => {
    if (!selectedDay) return;
    fetch(`/api/get-busy-times?date=${format(selectedDay, 'yyyy-MM-dd')}`)
      .then((res) => res.json())
      .then((data) => {
        setBusyTimes(data.busySlots || []);
      })
      .catch((error) => {
        console.error('Error fetching busy times:', error);
        setBusyTimes([]);
      });
  }, [selectedDay]);

  const handleTimeSlotClick = (slot: Date) => {
    setSelectedTimeSlot(slot);
    setIsModalOpen(true);
  };

  // UTC timestamp comparison — correct regardless of visitor timezone
  const isSlotInPast = (slot: Date): boolean => isBefore(slot, new Date());

  // Exact UTC timestamp match against Google Calendar event start times
  const isSlotBooked = (slot: Date): boolean =>
    busyTimes.some((busyISO) => new Date(busyISO).getTime() === slot.getTime());

  const slots = selectedDay ? generateSLSlots(format(selectedDay, 'yyyy-MM-dd')) : [];

  const css = `
    .rdp {
      --rdp-cell-size: 40px;
      --rdp-accent-color: #007bcc;
      --rdp-background-color: #eef1f4;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    .rdp-day_selected, .rdp-day_selected:hover {
      background-color: #007bff;
      color: white;
    }
    .rdp-day_today {
      font-weight: bold;
      color: #007bff;
    }
  `;

  return (
    <div className="flex flex-col md:flex-row p-4 gap-8 max-w-4xl mx-auto bg-white rounded-lg border border-gray-300 mt-10">
      <style>{css}</style>

      {/* Calendar */}
      <div className="flex-shrink-0">
        <h2 className="text-lg font-semibold mb-2">Select a date</h2>
        <DayPicker
          mode="single"
          selected={selectedDay}
          onSelect={setSelectedDay}
          disabled={{ before: new Date() }}
          className="border rounded-md p-2"
        />
      </div>

      {/* Time Slots */}
      <div className="flex-1 overflow-y-auto" style={{ maxHeight: '400px' }}>
        <h2 className="text-lg font-semibold mb-1">
          Available times for {selectedDay ? format(selectedDay, 'eeee, MMMM d') : '...'}
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          Times shown in your local timezone ({userTZ}).
          Available 8:00 AM – 8:00 PM Sri Lanka Time.
        </p>
        {selectedDay ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {slots.map((slot) => {
              const isPast = isSlotInPast(slot);
              const isBooked = isSlotBooked(slot);
              const isDisabled = isPast || isBooked;

              const localTime = slot.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: userTZ,
              });
              const slTime = slot.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Colombo',
              });

              return (
                <button
                  key={slot.toISOString()}
                  onClick={() => handleTimeSlotClick(slot)}
                  disabled={isDisabled}
                  className={`
                    p-3 rounded-md border text-center font-medium
                    ${isDisabled
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                      : 'bg-white text-black border-black/55 hover:bg-primary-green hover:text-black transition-colors'
                    }
                  `}
                >
                  <div className="text-sm font-semibold">{localTime}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{slTime} SL</div>
                </button>
              );
            })}
          </div>
        ) : (
          <p>Please select a day to see available times.</p>
        )}
      </div>

      {/* Booking Modal */}
      {selectedTimeSlot && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          bookingTime={selectedTimeSlot}
        />
      )}
    </div>
  );
}