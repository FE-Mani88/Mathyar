import React from 'react'
import AdminPanelLayout from '@/components/layouts/AdminPanelLayout/AdminPanelLayout'
import userModel from '../../../models/Users'
import { authUser } from '@/utils/serverheplers'
import SweetAlertModal from '@/components/modules/SweetAlertModal/SweetAlertModal'
import LastUsers from '@/components/templates/AdminPanel/LastUsers'
import quizModel from '../../../models/Quizzes'
import LastExams from '@/components/templates/AdminPanel/LastExams'
import LastAdmins from '@/components/templates/AdminPanel/LastAdmins'

export default async function page() {
    const user = await authUser()

    if (!user) {
        return <SweetAlertModal title='!زمان ورود شما منقضی شده است' icon='info' confirmButtonText='بازگشت به ورود' redirectURL='login' />
    } else if (user.role !== 'ADMIN') {
        return <SweetAlertModal title='شما اجازه دسترسی به این صفحه را ندارید' icon='error' confirmButtonText='بازگشت به پنل کاربری' redirectURL='user-panel' />
    }

    const users = await userModel.find({})
    const quizzes = await quizModel.find({})
    const lastUsers = await userModel.find({ role: 'USER' }).sort({ _id: -1 }).limit(3)
    const lastQuizzes = await quizModel.find({}).sort({ _id: -1 }).limit(3)
    const admins = await userModel.find({ role: 'ADMIN' })

    const stats = [
        { title: "تعداد کاربران", count: users.length, completed: 2 },
        { title: "تعداد ادمین ها", count: admins.length, completed: 28 },
        { title: "تعداد آزمون ها", count: quizzes.length, completed: 1 },
        { title: "میانگین درصد درستی کاربران", count: "76%", completed: "5%" },
    ];

    return (
        <AdminPanelLayout>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 rounded-lg bg-indigo-300 py-4 px-4 max-w-5xl mx-auto">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white rounded p-4 shadow">
                        <div className="text-sm text-gray-500">{stat.title}</div>
                        <div className="text-2xl font-bold">{stat.count}</div>
                        <div className="text-xs text-gray-400">Mathyar</div>
                    </div>
                ))}
            </div>
            <LastUsers users={JSON.parse(JSON.stringify(lastUsers))} />
            <LastAdmins admins={JSON.parse(JSON.stringify(admins))} />
            <LastExams quizzes={JSON.parse(JSON.stringify(lastQuizzes))} />
        </AdminPanelLayout>
    )
}


export const metadata = {
    title: 'Mathyar | Admin Panel',
    icons: {
        icon: '/images/fav.png'
    }
}