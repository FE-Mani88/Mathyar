'use client'
import React from 'react'
import { Book, BookOpen, BookOpenText, Trash2, User } from 'lucide-react'

export default function LastExams({ quizzes }) {
    return (
        <div className="max-w-5xl mx-auto">
            <div className="bg-[#f1f5ff] rounded-lg shadow-sm mt-10 ltr">
                <div className="p-6">
                    <div className="flex flex-wrap justify-between items-center mb-6">
                        <div className="text-sm text-gray-600 mb-4 md:mb-0 !mx-auto sm:!mx-0">
                            سه آزمون آخری که در سایت ثبت شده اند
                        </div>
                        <button className="!bg-blue-600 !mx-auto sm:!mx-0 !text-white !px-3 !py-2 flex gap-2 items-center !rounded-lg hover:!bg-blue-700 transition-colors">
                            <BookOpenText />
                            <p>آخرین آزمون ها</p>
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full table-fixed">
                            <thead>
                                <tr className="bg-white">
                                    <th className="text-right py-3 px-4 w-1/5">عملیات</th>
                                    <th className="text-right py-3 px-4 w-1/5">تعداد سوالات</th>
                                    <th className="text-right py-3 px-4 w-1/5">درجه سختی</th>
                                    <th className="text-right py-3 px-4 w-1/5">مدت زمان</th>
                                    <th className="text-right py-3 px-4 w-1/5">نام</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quizzes.map((quiz, index) => (
                                    <tr
                                        key={index}
                                        className="bg-[#f1f5ff] border-b border-gray-200"
                                    >
                                        <td className="py-3 px-4 text-right flex gap-4 justify-end items-center">
                                            <button className="!text-white transition flex gap-1 !bg-red-600 hover:!bg-red-700 !px-1.5 !py-[2px] rounded-lg">
                                                <Trash2 className="w-5 h-5" />
                                                <p>حذف آزمون</p>
                                            </button>
                                        </td>
                                        <td className="py-3 px-4 text-right">{quiz.questions.length}</td>
                                        <td className="py-3 px-4 text-right truncate">{quiz.difficulty === 'easy' ? 'آسان' : quiz.difficulty === 'medium' ? 'متوسط' : 'سخت'}</td>
                                        <td className="py-3 px-4 text-right">{quiz.duration}</td>
                                        <td className="py-3 px-4 text-right">{quiz.title}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
