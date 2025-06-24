'use client'
import React from 'react'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import { FileQuestion, Search, Trash2 } from 'lucide-react'

export default function Questions({ questions }) {
    const router = useRouter()

    const removeQuestionHandler = async (questionID) => {
        Swal.fire({
            icon: 'question',
            title: 'آیا از حذف این سوال اطمینان دارید؟',
            showConfirmButton: false,
            showCancelButton: true,
            showDenyButton: true,
            denyButtonText: 'بله',
            cancelButtonText: 'خیر'
        }).then(async (result) => {
            if (result.isDenied) {
                const res = await fetch(`/api/questions/${questionID}`, {
                    method: 'DELETE'
                })

                if (res.ok) {
                    return Swal.fire({
                        icon: 'success',
                        title: 'سوال مورد نظر با موفقیت حذف شد',
                        confirmButtonText: 'فهمیدم'
                    }).then(() => {
                        router.refresh()
                    })
                }

                return Swal.fire({
                    icon: 'error',
                    title: 'خطایی در حذف سوال به وجود آمد',
                    confirmButtonText: 'فهمیدم'
                })

            } else {
                return null
            }
        })
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="bg-[#f1f5ff] rounded-lg shadow-sm mt-10 ltr">
                <div className="p-6">
                    <div className="flex flex-wrap justify-between items-center mb-4">
                        <div className="text-sm text-gray-600 mb-4 md:mb-0 mx-auto sm:mx-0">
                            همه سوالاتی که تا به حال در سایت ثبت شده اند
                        </div>
                        <button className="!bg-blue-600 !mx-auto sm:!mx-0 !text-white !px-4 !py-2 flex gap-1.5 !rounded-lg hover:!bg-blue-700 transition-colors">
                            <FileQuestion />
                            <p>همه سوالات</p>
                        </button>
                    </div>

                    {/* Start Search Box */}
                    <div className="w-full !pb-4 pt-2 flex">
                        <button className="bg-blue-500 !text-white !px-2 rounded-l-lg hover:bg-blue-600 transition">
                            <Search />
                        </button>
                        <input
                            placeholder="نام / شماره تلفن / ایمیل کاربر را سرچ کنید"
                            dir="rtl"
                            type="text"
                            className="w-full !outline-none focus:!ring-0 focus:!outline-none"
                        />
                    </div>
                    {/* End Search Box */}

                    <div className="overflow-x-auto">
                        <table className="w-full table-fixed">
                            <thead>
                                <tr className="bg-white">
                                    <th className="text-right py-3 px-4 w-1/5">عملیات</th>
                                    <th className="text-right py-3 px-4 w-1/5">آزمون</th>
                                    <th className="text-right py-3 px-4 w-1/5">تاریخ ثبت</th>
                                    <th className="text-right py-3 px-4 w-1/5">متن سوال</th>
                                    <th className="text-right py-3 px-4 w-1/8">شماره سوال</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questions.map((question, index) => (
                                    <tr
                                        key={index}
                                        className="bg-[#f1f5ff] border-b border-gray-200"
                                    >
                                        <td className="py-3 px-4 text-right flex gap-4 justify-end items-center">
                                            <button
                                                onClick={() => { removeQuestionHandler(question._id) }}
                                                className="!text-white transition flex !bg-red-600 hover:!bg-red-700 !px-1.5 !py-[2px] rounded-lg"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                                <p>حذف سوال</p>
                                            </button>
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <Link className='transition-all hover:!underline' href={`/admin-panel/quizzes/${question.quiz._id}`}>
                                                {question.quiz?.title}
                                            </Link>
                                        </td>
                                        <td className="py-3 px-4 text-right truncate">{new Date(question.createdAt).toLocaleDateString('fa-IR')}</td>
                                        <td className="py-3 px-4 text-right">
                                            <Link className='transition-all hover:!underline hover:!text-indigo-600' href={`/admin-panel/questions/${question._id}`}>
                                                ...{question.question.slice(0, 18)}
                                            </Link>
                                        </td>
                                        <td className="py-3 px-4 text-right">{index + 1}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* مشاهده بیشتر
                        {visibleCount < users.length && (
                            <div className="text-center mt-6">
                                <button
                                    onClick={handleLoadMore}
                                    className="!px-6 !py-2 bg-blue-600 !text-white rounded hover:bg-blue-700 transition"
                                >
                                    مشاهده کاربران بیشتر
                                </button>
                            </div>
                        )}

                        {visibleCount > users.length && (
                            <div className="text-center mt-6">
                                <button
                                    onClick={handleLoadLess}
                                    className="!px-6 !py-2 bg-red-600 !text-white rounded hover:bg-red-700 transition"
                                >
                                    مشاهده کاربران کمتر
                                </button>
                            </div>
                        )} */}
                </div>
            </div>
        </div>
    )
}
