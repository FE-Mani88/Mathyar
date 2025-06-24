import React from 'react';
import AdminPanelLayout from '@/components/layouts/AdminPanelLayout/AdminPanelLayout';
import { NotebookPen, FileQuestion, Percent, ChartArea } from 'lucide-react';
import quizModel from '../../../../models/Quizzes';
import questionModel from '../../../../models/Questions';
import quizResultModel from '../../../../models/QuizResults';
import Link from 'next/link';
import Chart from '@/components/templates/AdminPanel/Chart';

export default async function Page() {
    const quizzes = await quizModel.find({});
    const questions = await questionModel.find({});
    const quizResults = await quizResultModel.find({});

    const averageUsersPercentageHandler = () => {
        if (!quizResults.length) return 0;
        let sum = 0;
        quizResults.forEach((q) => {
            sum += q.correctAnswersPercentage;
        });
        return sum / quizResults.length;
    };

    const stats = [
        { title: "تعداد کل آزمون ها", count: quizzes.length, icon: <NotebookPen /> },
        { title: "تعداد کل سوالات", count: questions.length, icon: <FileQuestion /> },
        { title: "میانگین سوالات برای هر آزمون", count: quizzes.length ? (questions.length / quizzes.length).toFixed(1) : 0, icon: <ChartArea /> },
        { title: "میانگین درصد پاسخگویی کاربران", count: `${averageUsersPercentageHandler().toFixed(2)}%`, icon: <Percent /> },
    ];

    // ساخت دیتا فیک برای چارت
    const chartData = [
        { month: 'فروردین', avgQuestions: 10 },
        { month: 'اردیبهشت', avgQuestions: 12 },
        { month: 'خرداد', avgQuestions: 15 },
        { month: 'تیر', avgQuestions: 13 },
        { month: 'مرداد', avgQuestions: 16 },
    ];

    return (
        <AdminPanelLayout>
            <div className="">
                <div className='bg-[#624bff] py-4'>
                    <div className="px-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="!text-2xl text-white">آمار کلی شما</h1>
                            <button className="bg-white !text-black !px-4 !py-2 rounded">
                                <Link href="/admin-panel/add-quiz">ساخت آزمون جدید</Link>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="bg-white rounded p-4 shadow">
                                    <div className="flex justify-between items-center">
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
            </div>

            {/* Quizzes Boxes */}
            {quizzes.length ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
                {quizzes.map((quiz, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                        <img
                            className="w-full min-h-40 max-h-40 object-cover"
                            src={quiz.imageUrl}
                            alt={`Quiz ${index + 1}`}
                        />
                        <div className="p-4 flex flex-col gap-2">
                            <h3 className="text-lg font-semibold text-gray-800 truncate">{quiz.title || 'عنوان آزمون'}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {quiz.description || 'توضیحات کوتاه برای این آزمون نمایش داده خواهد شد.'}
                            </p>
                            <div className="mt-2 flex justify-between items-center">
                                <span className="text-xs text-gray-400">{quiz.createdAt?.toLocaleDateString('fa-IR') || 'تاریخ ایجاد'}</span>
                                <Link href={`/admin-panel/quizzes/${quiz._id}`} className="text-indigo-600 text-sm font-medium hover:!underline">
                                    مشاهده
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div> : null}

            {!quizzes.length && (
                <>
                    <div className='flex justify-center items-center h-[40vh]'>
                        <p>
                            هنوز هیچ آزمونی موجود نیست!
                        </p>
                    </div>
                </>
            )}

            {/* End Quizzes Boxes */}

            {/* Chart */}
            {/* <div className="!bg-white rounded p-6 shadow mb-8 !px-10 mt-10">
                <h2 className="text-lg font-bold mb-4 text-gray-700">میانگین سوالات آزمون در ماه</h2>
                <Chart data={chartData} />
            </div> */}
        </AdminPanelLayout>
    );
}
