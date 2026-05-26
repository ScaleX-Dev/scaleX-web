'use client';

import { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import {
  format,
  isSameDay,
  isBefore,
  isAfter,
  addMinutes,
  setHours,
  setMinutes,
  parse,
} from 'date-fns';
import BookingModal from './BookingModal';

// Define your available time slots
// You can customize this as needed
const timeSlots = [
  '09:00', '09:45', '10:30', '11:15',
  '13:00', '13:45', '14:30', '15:15', '16:00',
];

export default function BookingCalendar() {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const [busyTimes, setBusyTimes] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<Date | null>(null);

  // Fetch busy times when the selected day changes
  useEffect(() => {
    if (!selectedDay) return;

    // Fetch busy times from your API
    fetch(`/api/get-busy-times?date=${format(selectedDay, 'yyyy-MM-dd')}`)
      .then((res) => res.json())
      .then((data) => {
        // data.busySlots will be an array of ISO strings (e.g., "2025-11-20T09:00:00.000Z")
        setBusyTimes(data.busySlots || []);
      })
      .catch((error) => {
        console.error('Error fetching busy times:', error);
        setBusyTimes([]);
      });
  }, [selectedDay]);

  // Handle clicking a time slot
  const handleTimeSlotClick = (time: string) => {
    if (!selectedDay) return;

    const [hours, minutes] = time.split(':').map(Number);
    const selectedDateTime = setMinutes(setHours(selectedDay, hours), minutes);

    setSelectedTimeSlot(selectedDateTime);
    setIsModalOpen(true);
  };

  // Generate the full Date object for a time slot string
  const getSlotDateTime = (time: string): Date => {
    if (!selectedDay) return new Date(); // Fallback
    const [hours, minutes] = time.split(':').map(Number);
    return setMinutes(setHours(selectedDay, hours), minutes);
  };

  // Check if a slot is in the past
  const isSlotInPast = (slotTime: Date): boolean => {
    return isBefore(slotTime, new Date());
  };

  // Check if a slot is booked
  const isSlotBooked = (slotTime: Date): boolean => {
    return busyTimes.some((busyISO) => {
      const busyDate = new Date(busyISO);
      return isSameDay(busyDate, slotTime) && 
             busyDate.getHours() === slotTime.getHours() &&
             busyDate.getMinutes() === slotTime.getMinutes();
    });
  };

  // CSS for react-day-picker to match the screenshot
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
          disabled={{ before: new Date() }} // Disable past dates
          className="border rounded-md p-2"
        />
      </div>

      {/* Time Slots */}
      <div className="flex-1 overflow-y-auto" style={{ maxHeight: '400px' }}>
        <h2 className="text-lg font-semibold mb-4">
          Available times for {selectedDay ? format(selectedDay, 'eeee, MMMM d') : '...'}
        </h2>
        {selectedDay ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {timeSlots.map((time) => {
              const slotDateTime = getSlotDateTime(time);
              const isPast = isSlotInPast(slotDateTime);
              const isBooked = isSlotBooked(slotDateTime);
              const isDisabled = isPast || isBooked;

              return (
                <button
                  key={time}
                  onClick={() => handleTimeSlotClick(time)}
                  disabled={isDisabled}
                  className={`
                    p-3 rounded-md border text-center font-medium
                    ${isDisabled
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                      : 'bg-white text-black border-black/55 hover:bg-primary-green hover:text-black transition-colors'
                    }
                  `}
                >
                  {time}
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