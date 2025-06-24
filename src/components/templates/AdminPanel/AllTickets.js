'use client'
import React from 'react'
import { Trash2 } from 'lucide-react'

export default function AllTickets({ tickets }) {
    return (
        <div className="overflow-x-auto ltr">
            <table className="w-full table-fixed">
                <thead>
                    <tr className="bg-white">
                        <th className="text-right py-3 px-4 w-1/5">عملیات</th>
                        <th className="text-right py-3 px-4 w-1/5">نقش</th>
                        <th className="text-right py-3 px-4 w-1/5">تاریخ ارسال</th>
                        <th className="text-right py-3 px-4 w-1/5">شماره تلفن فرستنده</th>
                        <th className="text-right py-3 px-4 w-1/5">موضوع تیکت</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket, index) => (
                        <tr
                            key={index}
                            onClick={() => window.location.href = `/admin/tickets/${ticket._id}`} // اینجا مسیر رو تعیین می‌کنیم
                            className="bg-[#f1f5ff] border-b border-gray-200 cursor-pointer hover:bg-indigo-100 transition"
                        >
                            <td className="py-3 px-4 text-right flex gap-4 justify-end items-center">
                                <button className="!text-white transition flex !bg-red-600 hover:!bg-red-700 !px-1.5 !py-[2px] rounded-lg">
                                    <Trash2 className="w-5 h-5" />
                                    <p>حذف تیکت</p>
                                </button>
                            </td>
                            <td className="py-3 px-4 text-right">کاربر</td>
                            <td className="py-3 px-4 text-right truncate">{new Date(ticket.createdAt).toLocaleDateString('fa-IR')}</td>
                            <td className="py-3 px-4 text-right">{ticket.userId?.phoneNumber}</td>
                            <td className="py-3 px-4 text-right">{ticket.subject}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}
