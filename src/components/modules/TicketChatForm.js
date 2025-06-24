'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TicketContent({ ticket, user }) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(null);

  const router = useRouter()

  const handleReply = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    setIsSending(true);

    try {
      const res = await fetch("/api/tickets/replies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketId: ticket._id,
          message,
        }),
      });

      if (res.ok) {
        setMessage("");
        setSuccess(true);
        router.refresh()
      } else {
        setSuccess(false);
      }
    } catch (err) {
      console.error(err);
      setSuccess(false);
    }

    setIsSending(false);
  };

  return (
    <form onSubmit={handleReply} className="mt-6 space-y-4">
      <textarea
        className="w-full border p-3 rounded resize-none"
        rows="4"
        placeholder="پاسخ خود را وارد کنید..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="bg-indigo-600 !text-white !px-4 !py-2 rounded w-full hover:bg-indigo-700 transition disabled:!opacity-50"
        disabled={isSending}
      >
        {isSending ? "در حال ارسال..." : "ارسال پاسخ"}
      </button>
      {success === true && <p className="text-green-600 text-sm !mt-1">پاسخ با موفقیت ارسال شد.</p>}
      {success === false && <p className="text-red-600 text-sm !mt-1">خطا در ارسال پاسخ.</p>}
    </form>
  );
}
