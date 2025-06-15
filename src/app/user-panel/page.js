import React from 'react'
import UserPanelLayout from '@/components/layouts/UserPanelLayout/UserPanelLayout'
import { authUser } from '@/utils/serverheplers'
import SweetAlertModal from '@/components/modules/SweetAlertModal/SweetAlertModal'
import { BookOpenText, CheckCircle, MessageCircleQuestion, NotebookPen, Percent, Users } from 'lucide-react'
import Link from 'next/link'
import quizResultModel from '../../../models/QuizResults'

export default async function page() {
    const user = await authUser()

    if (!user) {
        return <SweetAlertModal title='!زمان ورود شما منقضی شده است' icon='info' confirmButtonText='بازگشت به ورود' redirectURL='login' />
    } else if (user.role !== 'USER') {
        return <SweetAlertModal title='شما اجازه دسترسی به این صفحه را ندارید' icon='error' confirmButtonText='بازگشت به پنل کاربری' redirectURL='admin-panel' />
    }

    // User Datas
    const userQuizzes = await quizResultModel.find({ user: user._id })
    const mainQuizzesResults = await quizResultModel.find({ user: user._id }).populate('user quiz')

    // Calculate Average Percentage
    const calculateUserAveragePercentage = () => {
        let totalPercentage = 0

        mainQuizzesResults.forEach((quiz) => {
            totalPercentage = totalPercentage + quiz.correctAnswersPercentage
        })

        return mainQuizzesResults.length ? (totalPercentage / mainQuizzesResults.length).toFixed(2) : 0
    }

    const allCorrectAnswersCalc = () => {
        let allCorrectAnswers = 0

        mainQuizzesResults.forEach((quizResult) => {
            allCorrectAnswers = allCorrectAnswers + quizResult.correctAnswersNumber
        })

        return allCorrectAnswers;
    }

    const stats = [
        { title: "آزمون های داده شده", count: userQuizzes.length, icon: <NotebookPen /> },
        { title: "امتیاز شما", count: mainQuizzesResults.length ? (allCorrectAnswersCalc() / userQuizzes.length).toFixed(2) * 100 : 0, icon: <BookOpenText /> },
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
                        <div className="grid grid-cols-6 font-semibold text-gray-600 border-b pb-2">
                            <div>نام آزمون</div>
                            <div>مدت زمان</div>
                            <div>درجه سختی</div>
                            <div>تعداد پاسخ های درست</div>
                            <div>درصد پاسخ های درست</div>
                            <div>مشاهده کارنامه</div>
                        </div>
                        {mainQuizzesResults.map((quizResult, index) => (
                            <div key={index} className="grid grid-cols-6 items-center py-3 border-b text-sm">
                                <div>{quizResult.quiz.title}</div>
                                <div>{quizResult.quiz.duration} دقیقه</div>
                                <div>
                                    <span className={`px-2 py-1 rounded text-white text-xs ${quizResult.quiz.difficulty === 'High' ? 'bg-red-500' :
                                        quizResult.quiz.difficulty === 'medium' ? 'bg-yellow-500' :
                                            quizResult.quiz.difficulty === 'easy' ? 'bg-blue-500' :
                                                'bg-green-500'
                                        }`}>{quizResult.quiz.difficulty === 'easy' ? 'آسان' : quizResult.quiz.difficulty === 'medium' ? 'متوسط' : 'سخت'}</span>
                                </div>
                                <div>
                                    {quizResult.correctAnswersNumber} پاسخ درست
                                </div>

                                <div className="flex items-center gap-2">
                                    <span>{quizResult.correctAnswersPercentage}%</span>
                                    <div className="w-24 bg-gray-200 h-2 rounded">
                                        <div className="bg-purple-600 h-2 rounded" style={{ width: `${quizResult.correctAnswersPercentage}%`, backgroundColor: `${quizResult.correctAnswersPercentage >= 80 ? '#4CAF50' : quizResult.correctAnswersPercentage >= 50 ? '#C0CA33' : quizResult.correctAnswersPercentage >= 30 ? '#FF9800' : '#E53935'}` }}></div>
                                    </div>
                                </div>
                                {/*  */}
                                <div className='bg-[#624bff] w-max px-3 text-white rounded-sm !py-1.5'>
                                    <button>
                                        مشاهده کارنامه
                                    </button>
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