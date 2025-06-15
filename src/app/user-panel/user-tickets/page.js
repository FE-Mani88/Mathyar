import React from 'react'
import UserPanelLayout from '@/components/layouts/UserPanelLayout/UserPanelLayout'
import {
    NotebookPen,
    BookOpenText,
    CheckCircle,
    Percent
} from 'lucide-react'
import Link from 'next/link'

export default function page() {

    const stats = [
        { title: "همه تیکت ها", count: 18, icon: <NotebookPen /> },
        { title: "تیکت های پاسخ داده شده", count: 14, icon: <BookOpenText /> },
        { title: "تیکت های در انتظار پاسخ", count: 12, icon: <CheckCircle /> },
        { title: "تیکت های بسته شده", count: `${30}%`, icon: <Percent /> },
    ];

    return (
        <UserPanelLayout>
            <div className="min-h-screen bg-gray-100 pb-6 text-sm">
                <div className='bg-[#624bff] py-4'>
                    <div className='px-6'>
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="!text-2xl text-white">آمار تیکت های شما</h1>
                            <button className="bg-white !text-black !px-4 !py-2 rounded">
                                <Link href='/user-panel/send-ticket'>ارسال تیکت جدید</Link>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="bg-white rounded p-4 shadow">
                                    <div className='flex justify-between items-center'>
                                        <div className="text-sm text-gray-500">{stat.title}</div>
                                        {/* Start SVG */}
                                        <div className="bg-indigo-100 text-indigo-600 w-10 h-10 flex items-center justify-center rounded-md">
                                            {stat.icon}
                                        </div>
                                        {/* End SVG */}
                                    </div>
                                    <div className="text-2xl font-bold">{stat.count}</div>
                                    <div className="text-xs text-gray-400">Mathyar</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded shadow">
                    {/* <h2 className="text-lg font-bold mb-4">Active Projects</h2> */}
                    <div className="grid grid-cols-4 font-semibold text-gray-600 border-b pb-2 text-center">
                        <div>موضوع تیکت</div>
                        <div>تاریخ ارسال</div>
                        <div>فرستنده تیکت</div>
                        <div>وضعیت تیکت</div>
                    </div>


                </div>
            </div>
        </UserPanelLayout>
    )
}
