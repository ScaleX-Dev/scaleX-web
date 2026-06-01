'use client';

import { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  bookingTime: Date;
};

const inputClass =
  'w-full px-3.5 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all duration-150 placeholder:text-gray-300 focus:border-[#00ff81] focus:bg-white focus:ring-2 focus:ring-[#00ff81]/20';

export default function BookingModal({ isOpen, onClose, bookingTime }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [brief, setBrief] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const slDate = bookingTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Colombo',
  });
  const slTime = bookingTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Colombo',
  });
  const localTime = bookingTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: userTZ,
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(12,13,14,0.72)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">

        {/* Modal header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between">
          <div>
            <p className="text-[10px] font-mono text-[#00cc68] tracking-[0.2em] uppercase mb-1">
              Confirm booking
            </p>
            <h2 className="text-lg font-semibold text-gray-900 leading-tight">
              {slDate}
            </h2>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-sm font-medium text-gray-700">{slTime} SLT</span>
              <span className="text-gray-300">·</span>
              <span className="text-sm text-gray-400">{localTime} {userTZ}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-gray-500 transition-colors mt-0.5 text-xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {error && (
            <div className="mb-4 px-3.5 py-2.5 bg-rose-50 border border-rose-200 rounded-xl text-sm text-rose-600">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 px-3.5 py-2.5 bg-[#f0fff7] border border-[#00ff81]/40 rounded-xl text-sm text-[#009952] font-medium flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {success}
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="bm-name" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                    Full name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="bm-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="John Smith"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="bm-phone" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                    Phone
                  </label>
                  <input
                    id="bm-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 555 000"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bm-email" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  Email address <span className="text-rose-400">*</span>
                </label>
                <input
                  id="bm-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="john@company.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="bm-company" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  Company name
                </label>
                <input
                  id="bm-company"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Acme Inc."
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="bm-brief" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  What do you need help with?
                </label>
                <textarea
                  id="bm-brief"
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  rows={3}
                  placeholder="Give us a brief overview..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#00ff81] text-[#0c0d0e] text-sm font-semibold hover:bg-[#00e873] disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Booking…
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
