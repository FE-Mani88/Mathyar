import React from 'react'
import UserPanelLayout from '@/components/layouts/UserPanelLayout/UserPanelLayout'
import { authUser } from '@/utils/serverheplers'
import SweetAlertModal from '@/components/modules/SweetAlertModal/SweetAlertModal'
import { BookOpenText, CheckCircle, Percent, Users } from 'lucide-react'
import Link from 'next/link'

export default async function page() {
    const user = await authUser()

    if (!user) {
        return <SweetAlertModal title='!زمان ورود شما منقضی شده است' icon='info' confirmButtonText='بازگشت به ورود' redirectURL='login' />
    } else if (user.role !== 'USER') {
        return <SweetAlertModal title='شما اجازه دسترسی به این صفحه را ندارید' icon='error' confirmButtonText='بازگشت به پنل کاربری' redirectURL='admin-panel' />
    }

    const stats = [
        { title: "Projects", count: 18, icon: <Users /> },
        { title: "Active Task", count: 132, icon: <BookOpenText /> },
        { title: "Teams", count: 12, icon: <CheckCircle /> },
        { title: "Productivity", count: "76%", icon: <Percent /> },
    ];

    const projects = [
        { name: "Dropbox Design System", hours: 34, priority: "Medium", progress: 15 },
        { name: "Slack Team UI Design", hours: 47, priority: "High", progress: 35 },
        { name: "GitHub Satellite", hours: 120, priority: "Low", progress: 75 },
        { name: "3D Character Modelling", hours: 89, priority: "Medium", progress: 63 },
        { name: "Webapp Design System", hours: 108, priority: "Track", progress: 100 },
    ];


    return (
        <>
            <UserPanelLayout>
                <div className="min-h-screen bg-gray-100 pb-6 text-sm">
                    <div className='bg-[#624bff] py-4'>
                        <div className='px-6'>
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="!text-2xl text-white">آزمون های داده شده</h1>
                                <button className="bg-white !text-black !px-4 !py-2 rounded">
                                    <Link href='/select'>شرکت در آزمون جدید</Link>
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
                                        <div className="text-xs text-gray-400">{stat.completed} Completed</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded shadow">
                        {/* <h2 className="text-lg font-bold mb-4">Active Projects</h2> */}
                        <div className="grid grid-cols-6 font-semibold text-gray-600 border-b pb-2">
                            <div>نام آزمون</div>
                            <div>مدت زمان</div>
                            <div>درجه سختی</div>
                            <div>تعداد سوالات</div>
                            <div>درصد پاسخ های درست</div>
                        </div>
                        {projects.map((proj, i) => (
                            <div key={i} className="grid grid-cols-6 items-center py-3 border-b text-sm">
                                <div>{proj.name}</div>
                                <div>{proj.hours}</div>
                                <div>
                                    <span className={`px-2 py-1 rounded text-white text-xs ${proj.priority === 'High' ? 'bg-red-500' :
                                        proj.priority === 'Medium' ? 'bg-yellow-500' :
                                            proj.priority === 'Low' ? 'bg-blue-500' :
                                                'bg-green-500'
                                        }`}>{proj.priority}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    {[...Array(3)].map((_, idx) => (
                                        <div key={idx} className="w-5 h-5 bg-gray-300 rounded-full"></div>
                                    ))}
                                    <span className="text-xs text-gray-500">+5</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>{proj.progress}%</span>
                                    <div className="w-24 bg-gray-200 h-2 rounded">
                                        <div className="bg-purple-600 h-2 rounded" style={{ width: `${proj.progress}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </UserPanelLayout>
        </>
    )
}

export const metadata = {
    title: 'Mathyar | User Panel',
    icons: {
        icon: '/images/fav.png'
    }
}