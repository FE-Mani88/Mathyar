'use client'
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import TicketContent from '../../modules/TicketChatForm';
import { useRouter } from 'next/navigation';
import { RefreshCcw } from 'lucide-react';

export default function TicketDetails({ ticket, user }) {

    const router = useRouter();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        router.refresh();
        setTimeout(() => setIsRefreshing(false), 1500);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md mt-8 !space-y-4">
            <div className='flex justify-between'>
                <h2 className="bg-indigo-100 text-indigo-600 !px-2 !py-1 rounded-[3px] mb-4">جزئیات تیکت</h2>
                <button
                    onClick={handleRefresh}
                    className="select-none bg-indigo-500 hover:bg-indigo-600 transition !text-white !px-2 !py-1 rounded-sm flex items-center gap-2 disabled:opacity-50"
                    disabled={isRefreshing}
                >
                    {isRefreshing ? 'در حال بروزرسانی...' : 'تازه‌سازی چت'}
                    {isRefreshing && (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                            <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                        </svg>
                    )}
                    <RefreshCcw className={`w-4 h-4 ${!isRefreshing ? '' : '!hidden'}`} />
                </button>
            </div>
            <div className="mb-6 !space-y-1.5">
                <p><strong>موضوع:</strong> {ticket.subject}</p>
                <p><strong>متن:</strong> {ticket.body}</p>
                <p><strong>وضعیت:</strong> <span className={`!text-white rounded-sm !px-5 !py-[1.5px] ${ticket.status === 'open' ? 'bg-emerald-400' : 'bg-red-500'}`}>{ticket.status === "closed" ? "بسته شده" : "باز"}</span></p>
            </div>

            <div className="!space-y-4">
                <h3 className="text-md font-semibold">گفت‌وگوها:</h3>
                {ticket.replies.length > 0 ? (
                    ticket.replies.map((reply, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded border text-sm">
                            <div className="flex justify-between items-center">
                                <span className="font-bold">{reply.userId?.phoneNumber == user.phoneNumber ? 'شما' : 'پشتیبانی'}</span>
                                <span className="text-xs text-gray-500">{new Date(reply.createdAt).toLocaleDateString('fa-IR')}</span>
                            </div>
                            <p className="!mt-2">{reply.message}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 text-sm">هنوز پاسخی داده نشده است.</p>
                )}
            </div>

            {ticket.status !== 'closed' && (
                <TicketContent
                    ticket={{
                        _id: ticket._id.toString(),
                        status: ticket.status,
                    }}
                    user={{
                        _id: user._id.toString(),
                        phoneNumber: user.phoneNumber,
                    }}
                />
            )}
        </div>
    )
}
