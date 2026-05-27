'use client';

import { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  bookingTime: Date;
};

export default function BookingModal({ isOpen, onClose, bookingTime }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [brief, setBrief] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const sendEmails = async () => {
    try {
      await fetch('/api/send-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          companyName,
          brief,
          date: bookingTime.toLocaleDateString('en-CA', { timeZone: 'Asia/Colombo' }),
          startTime: bookingTime.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Colombo',
          }),
        }),
      });
    } catch (err) {
      console.error('Error sending emails:', err);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    // API call to create the event
    try {
      const res = await fetch('/api/create-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          companyName,
          brief,
          startTime: bookingTime.toISOString(),
          // Assuming 45-minute slots
          endTime: new Date(bookingTime.getTime() + 30 * 60000).toISOString(),
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create event. Please try again.');
      }

      setSuccess('Appointment booked successfully!');
      setName('');
      setEmail('');
      setPhone('');
      setCompanyName('');
      setBrief('');
      setTimeout(() => {
        onClose();
        setSuccess('');
        sendEmails();
        window.location.href = '/thankyou?submitted=True';
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Confirm your booking</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>
        <p className="mb-4">
          You are booking for: <br />
          <strong className="text-black">
            {bookingTime.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'Asia/Colombo',
            })}{' '}
            at{' '}
            {bookingTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Asia/Colombo',
            })}{' '}
            Sri Lanka Time
          </strong>
          <br />
          <span className="text-sm text-gray-500">
            Your local time:{' '}
            {bookingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            {' '}({Intl.DateTimeFormat().resolvedOptions().timeZone})
          </span>
        </p>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        {!success && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="brief" className="block text-sm font-medium text-gray-700 mb-1">
                Brief about your requirement
              </label>
              <textarea
                id="brief"
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>  
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-primary-green text-black rounded-md disabled:bg-black transition-colors duration-300 disabled:text-white"
              >
                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}