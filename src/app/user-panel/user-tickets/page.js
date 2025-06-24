import React from 'react'
import UserPanelLayout from '@/components/layouts/UserPanelLayout/UserPanelLayout'
import {
    NotebookPen,
    BookOpenText,
    CheckCircle,
    Percent
} from 'lucide-react'
import Link from 'next/link'
import { authUser } from '@/utils/serverheplers'
import ticketModel from '../../../../models/Tickets'
import { redirect } from 'next/navigation'
import SweetAlertModal from '@/components/modules/SweetAlertModal/SweetAlertModal'

export default async function page() {

    const user = await authUser()

    if (!user) {
        return <SweetAlertModal title='زمان ورود شما منقضی شده است' icon='success' confirmButtonText='بازگشت به ورود' redirectURL='/login' />
    }

    const userTickets = await ticketModel.find({ userId: user._id })
    const userClosedTickets = await ticketModel.find({ userId: user._id, status: 'closed' })
    const userOpenTickets = await ticketModel.find({ userId: user._id, replies: { $exists: true, $size: 0 } })
    const answeredTickets = await ticketModel.find({
        userId: user._id,
        replies: { $exists: true, $not: { $size: 0 } }
    });

    const stats = [
        { title: "همه تیکت های شما", count: userTickets.length, icon: <NotebookPen /> },
        { title: "تیکت های پاسخ داده شده", count: answeredTickets.length, icon: <BookOpenText /> },
        { title: "تیکت های در انتظار پاسخ", count: userOpenTickets.length, icon: <CheckCircle /> },
        { title: "تیکت های بسته شده", count: userClosedTickets.length, icon: <Percent /> },
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
                    <div className="divide-y text-center">
                        {userTickets.map((ticket) => (
                            <div key={ticket._id} className="grid grid-cols-4 py-4 items-center">
                                <div>{ticket.subject}</div>
                                <div>{new Date(ticket.createdAt).toLocaleDateString('fa-IR')}</div>
                                <div>{user.phoneNumber}</div>
                                <div className="flex items-center justify-center gap-3">
                                    <span
                                        className={`select-none px-2 py-1 rounded-full min-w-10 text-xs ${ticket.status === "closed" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"
                                            }`}
                                    >
                                        {ticket.status === "closed" ? "بسته شده" : "باز"}
                                    </span>
                                    <Link
                                        href={`/user-panel/tickets/${ticket._id}`}
                                        className="!text-indigo-600 hover:!underline !text-xs bg-indigo-100 rounded-sm !py-1 !px-1"
                                    >
                                        مشاهده
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </UserPanelLayout>
    )
}
