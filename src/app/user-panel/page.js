import React from 'react'
import UserPanelLayout from '@/components/layouts/UserPanelLayout/UserPanelLayout'
import { authUser } from '@/utils/serverheplers'
import SweetAlertModal from '@/components/modules/SweetAlertModal/SweetAlertModal'
import { BookOpenText, CheckCircle, NotebookPen, Percent } from 'lucide-react'
import Link from 'next/link'
import quizResultModel from '../../../models/QuizResults'
import UserCharts from '@/components/templates/UserPanel/UserCharts'
import connectToDB from '../../../configs/connectToDB'
import moment from 'moment-jalaali'

moment.loadPersian({ usePersianDigits: false });

export default async function page() {
    await connectToDB()
    const user = await authUser()

    if (!user) {
        return <SweetAlertModal title='!زمان ورود شما منقضی شده است' icon='info' confirmButtonText='بازگشت به ورود' redirectURL='login' />
    } else if (user.role !== 'USER') {
        return <SweetAlertModal title='شما اجازه دسترسی به این صفحه را ندارید' icon='error' confirmButtonText='بازگشت به پنل کاربری' redirectURL='admin-panel' />
    }

    const mainQuizzesResults = await quizResultModel.find({ user: user._id }).populate('user quiz')

    const chartData = mainQuizzesResults.map(result => ({
        month: moment(result.createdAt).format('jYYYY-jMM-jDD'),
        value: result.correctAnswersPercentage
    }))

    const userQuizzes = mainQuizzesResults.length

    const calculateUserAveragePercentage = () => {
        const total = mainQuizzesResults.reduce((acc, cur) => acc + cur.correctAnswersPercentage, 0)
        return mainQuizzesResults.length ? (total / mainQuizzesResults.length).toFixed(2) : 0
    }

    const allCorrectAnswersCalc = () => {
        return mainQuizzesResults.reduce((acc, cur) => acc + cur.correctAnswersNumber, 0)
    }

    const stats = [
        { title: "آزمون های داده شده", count: userQuizzes, icon: <NotebookPen /> },
        { title: "امتیاز شما", count: userQuizzes ? ((allCorrectAnswersCalc() / userQuizzes).toFixed(2) * 100) : 0, icon: <BookOpenText /> },
        { title: "کل پاسخ های درست شما", count: allCorrectAnswersCalc(), icon: <CheckCircle /> },
        { title: "میانگین درصد ها", count: `${calculateUserAveragePercentage()}%`, icon: <Percent /> },
    ];

    return (
        <>
            <UserPanelLayout>
                <div className="min-h-screen bg-gray-100 pb-6 text-sm">
                    <div className='bg-[#624bff] py-4'>
                        <div className='px-6'>
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="!text-2xl text-white">آمار کلی شما</h1>
                                <button className="bg-white !text-black !px-4 !py-2 rounded">
                                    <Link href='/select'>شرکت در آزمون جدید</Link>
                                </button>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                                {stats.map((stat, idx) => (
                                    <div key={idx} className="bg-white rounded p-4 shadow">
                                        <div className='flex justify-between items-center'>
                                            <div className="text-sm text-gray-500">{stat.title}</div>
                                            <div className="bg-indigo-100 text-indigo-600 w-10 h-10 flex items-center justify-center rounded-md">
                                                {stat.icon}
                                            </div>
                                        </div>
                                        <div className="text-2xl font-bold">{stat.count}</div>
                                        <div className="text-xs text-gray-400">Mathyar</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <UserCharts data={chartData} />
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
