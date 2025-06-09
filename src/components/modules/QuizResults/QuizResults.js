import React from 'react';
import Link from 'next/link';
import { Trophy, XCircle, CheckCircle, RotateCcw } from 'lucide-react';

export function QuizResults({ score, totalQuestions, answers, questions, quizTitle, onRetry, quizId }) {
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
        <div className="min-h-screen bg-gray-50 py-2 px-4 dark:bg-[#121a29]">
            {/*  */}
            <div className="c5sfa c307p c1sv4 cavhb cnmzr" aria-hidden="true">
                <img src="https://preview.cruip.com/neon/images/hero-illustration.svg" className="cy2lr" width={2143} height={737} alt="Hero Illustration" />
            </div>
            {/*  */}
            <div className="max-w-3xl mx-auto p-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 dark:bg-[#303b52]">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                            <Trophy className="w-10 h-10 text-blue-600" />
                        </div>
                        <h1 className="!text-3xl font-bold dark:text-white text-gray-900 mb-2">{quizTitle} - Results</h1>
                        <p className="text-2xl font-semibold text-blue-600">
                            امتیاز شما: {score}/{totalQuestions} (%{percentage})
                        </p>
                    </div>

                    <div className="space-y-6 mb-8">
                        {questions.map((question, index) => (
                            <div key={index} className="border rounded-lg p-4">
                                <div className="flex items-start gap-3 rtl">
                                    {answers[index] === question.correctAnswer ? (
                                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    ) : (
                                        <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                                    )}
                                    <div>
                                        <p className="font-medium text-gray-900 mb-2 dark:text-white">{question.question}</p>
                                        <p className="text-sm text-gray-600 dark:text-white">پاسخ شما: {answers[index]}</p>
                                        {answers[index] !== question.correctAnswer && (
                                            <p className="text-sm text-green-600">پاسخ صحیح: {question.correctAnswer}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={onRetry}
                            className="flex-1 flex items-center justify-center gap-2 !bg-blue-600 !text-white py-3 px-6 rounded-lg font-medium hover:!bg-blue-700 transition-colors"
                        >
                            <RotateCcw className="w-5 h-5 !hidden sm:!flex" />
                            تلاش دوباره
                        </button>
                        <Link
                            href="/select"
                            className="flex-1 flex items-center justify-center bg-slate-300 dark:text-white dark:bg-slate-500 text-gray-700 py-3 px-4 sm:px-6 rounded-lg font-medium hover:!text-gray-600 hover:!bg-gray-200 transition-colors text-sm !text-white"
                        >
                            بازگشت به آزمون ها
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}