'use client';

import { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, isBefore } from 'date-fns';
import BookingModal from './BookingModal';

// Sri Lanka is UTC+5:30
const SL_OFFSET_MS = 5.5 * 60 * 60 * 1000;

function generateSLSlots(slDateStr: string): Date[] {
  const [year, month, day] = slDateStr.split('-').map(Number);
  const slots: Date[] = [];
  let totalMinutes = 8 * 60;
  const lastSlotMinutes = 19 * 60 + 15;
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
  const [isLoading, setIsLoading] = useState(false);

  const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    if (!selectedDay) return;
    setIsLoading(true);
    fetch(`/api/get-busy-times?date=${format(selectedDay, 'yyyy-MM-dd')}`)
      .then((res) => res.json())
      .then((data) => {
        setBusyTimes(data.busySlots || []);
      })
      .catch((error) => {
        console.error('Error fetching busy times:', error);
        setBusyTimes([]);
      })
      .finally(() => setIsLoading(false));
  }, [selectedDay]);

  const handleTimeSlotClick = (slot: Date) => {
    setSelectedTimeSlot(slot);
    setIsModalOpen(true);
  };

  const isSlotInPast = (slot: Date): boolean => isBefore(slot, new Date());
  const isSlotBooked = (slot: Date): boolean =>
    busyTimes.some((busyISO) => new Date(busyISO).getTime() === slot.getTime());

  const slots = selectedDay ? generateSLSlots(format(selectedDay, 'yyyy-MM-dd')) : [];

  const css = `
    .rdp-root {
      --rdp-cell-size: 38px;
      --rdp-accent-color: #00ff81;
      --rdp-background-color: #f0fff7;
      --rdp-accent-color-dark: #00cc68;
      font-family: inherit;
    }
    .rdp-month_caption {
      font-size: 0.875rem;
      font-weight: 600;
      color: #111827;
      padding-bottom: 8px;
    }
    .rdp-weekday {
      font-size: 0.7rem;
      font-weight: 600;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .rdp-day {
      font-size: 0.8rem;
      color: #374151;
      border-radius: 8px;
      transition: background 0.15s, color 0.15s;
    }
    .rdp-day:hover:not([disabled]) {
      background: #f0fff7 !important;
      color: #00cc68 !important;
    }
    .rdp-selected .rdp-day {
      background: #00ff81 !important;
      color: #0c0d0e !important;
      font-weight: 700;
    }
    .rdp-today:not(.rdp-selected) .rdp-day {
      color: #00cc68;
      font-weight: 700;
    }
    .rdp-disabled .rdp-day {
      color: #d1d5db !important;
      opacity: 0.5;
    }
    .rdp-nav button {
      color: #6b7280;
      border-radius: 8px;
      padding: 4px;
      transition: background 0.15s;
    }
    .rdp-nav button:hover {
      background: #f0fff7;
      color: #00cc68;
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="bg-white rounded-2xl shadow-[0_8px_48px_rgba(0,0,0,0.10)] border border-gray-100 overflow-hidden">

        {/* Header strip */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#00ff81] inline-block" />
          <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">
            30-min discovery call · free
          </span>
        </div>

        <div className="flex flex-col lg:flex-row">

          {/* ── Left: Calendar ── */}
          <div className="lg:w-[340px] flex-shrink-0 p-6 border-b lg:border-b-0 lg:border-r border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Select a date
            </p>
            <DayPicker
              mode="single"
              selected={selectedDay}
              onSelect={setSelectedDay}
              disabled={{ before: new Date() }}
            />
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-[11px] text-gray-400 leading-relaxed">
                <span className="font-semibold text-gray-500">Your timezone:</span>{' '}
                {userTZ}
              </p>
              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                Available 8:00 AM – 8:00 PM Sri Lanka Time
              </p>
            </div>
          </div>

          {/* ── Right: Time Slots ── */}
          <div className="flex-1 p-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
              Available times
            </p>
            <p className="text-sm font-semibold text-gray-800 mb-4">
              {selectedDay ? format(selectedDay, 'EEEE, MMMM d') : '—'}
            </p>

            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-5 h-5 border-2 border-[#00ff81] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : selectedDay ? (
              <div
                className="grid grid-cols-2 sm:grid-cols-3 gap-2 overflow-y-auto pr-1"
                style={{ maxHeight: '340px' }}
              >
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
                        group relative rounded-xl border px-3 py-2.5 text-center transition-all duration-150
                        ${isDisabled
                          ? 'border-gray-100 bg-gray-50 cursor-not-allowed'
                          : 'border-gray-200 bg-white hover:border-[#00ff81] hover:bg-[#f0fff7] hover:shadow-sm cursor-pointer'
                        }
                      `}
                    >
                      <div
                        className={`text-sm font-semibold ${
                          isDisabled ? 'text-gray-300 line-through' : 'text-gray-800 group-hover:text-[#009952]'
                        }`}
                      >
                        {localTime}
                      </div>
                      <div className={`text-[10px] mt-0.5 ${isDisabled ? 'text-gray-300' : 'text-gray-400'}`}>
                        {slTime} SLT
                      </div>
                      {isBooked && (
                        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-300" />
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-400">Please select a date first.</p>
            )}

            {/* Legend */}
            <div className="flex items-center gap-4 mt-5 pt-4 border-t border-gray-100">
              <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
                <span className="w-2.5 h-2.5 rounded border border-[#00ff81] bg-[#f0fff7] inline-block" />
                Available
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
                <span className="w-2.5 h-2.5 rounded border border-gray-200 bg-gray-50 inline-block" />
                Unavailable
              </span>
            </div>
          </div>
        </div>
      </div>

      {selectedTimeSlot && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          bookingTime={selectedTimeSlot}
        />
      )}
    </>
  );
}