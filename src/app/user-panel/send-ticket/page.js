'use client';
import React, { useState } from "react";
import MotionDiv from '@/utils/MotionDiv'
import MotionButton from "@/utils/MotionButton";
import UserPanelLayout from "@/components/layouts/UserPanelLayout/UserPanelLayout";

export default function TicketForm() {

  const [formData, setFormData] = useState({
    subject: '',
    body: ''
  })

  const ticketSubmitHandler = async () => {
    const res = await fetch('/api/ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
  }

  return (
    <UserPanelLayout>
      <MotionDiv
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto mt-8 sm:mt-8 md:mt-12 bg-white shadow-2xl rounded-3xl p-10 space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center">ارسال تیکت به پشتیبانی</h2>

        <form className="space-y-6">

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">موضوع</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
              placeholder="عنوان تیکت مثل: مشکل پرداخت"
              className="w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">متن پیام</label>
            <textarea
              value={formData.body}
              onChange={(event) => setFormData({ ...formData, body: event.target.value })}
              rows="5"
              placeholder="لطفاً مشکل خود را با جزئیات بنویسید..."
              className="w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <MotionButton
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 !text-white !py-3 !rounded-xl !shadow-md hover:!shadow-lg transition-all"
          >
            ارسال تیکت
          </MotionButton>
        </form>
      </MotionDiv>
    </UserPanelLayout>
  );
}
