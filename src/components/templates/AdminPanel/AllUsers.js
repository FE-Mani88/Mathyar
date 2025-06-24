'use client'
import React, { useEffect, useState } from 'react'
import { Users, Trash2, Search } from 'lucide-react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

export default function AllUsers({ users }) {
    const [visibleCount, setVisibleCount] = useState(5)
    const [user, setUser] = useState(null)

    const router = useRouter()

    useEffect(() => {
        const getUser = async () => {
            const res = await fetch('/api/auth/getme')
            const data = await res.json()

            setUser(data)
        }

        getUser()
    }, [])

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 5)
    }

    const handleLoadLess = () => {
        setVisibleCount(5)
    }

    const visibleUsers = users.slice(0, visibleCount)

    const removeUserHandler = (mainUserId) => {
        Swal.fire({
            title: 'آیا از حذف این کاربر اطمینان دارید؟',
            showDenyButton: true,
            showCancelButton: true,
            cancelButtonText: 'لغو',
            showConfirmButton: false,
            denyButtonText: `حذف`,
            icon: 'warning',
        }).then(async (result) => {
            if (result.isDenied) {
                try {
                    const res = await fetch(`/api/users/${mainUserId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                    if (res.ok) {
                        Swal.fire({
                            title: '(: کاربر حذف شد ',
                            icon: 'success',
                            confirmButtonText: 'متوجه شدم',
                        }).then(() => {
                            router.refresh()
                        })
                    }
                } catch (error) {
                    console.error('Error => ', error)
                }
            } else {
                Swal.fire({
                    title: '!تغییرات ذخیره نشد',
                    icon: 'info',
                    confirmButtonText: 'متوجه شدم',
                })
            }
        })
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="bg-[#f1f5ff] rounded-lg shadow-sm mt-10 ltr">
                <div className="p-6">
                    <div className="flex flex-wrap justify-between items-center mb-4">
                        <div className="text-sm text-gray-600 mb-4 md:mb-0 mx-auto sm:mx-0">
                            همه کاربرانی که در سایت ثبت نام کرده اند
                        </div>
                        <button className="!bg-blue-600 !mx-auto sm:!mx-0 !text-white !px-4 !py-2 flex gap-1.5 !rounded-lg hover:!bg-blue-700 transition-colors">
                            <Users />
                            <p>همه کاربران</p>
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
                                    <th className="text-right py-3 px-4 w-1/5">نقش</th>
                                    <th className="text-right py-3 px-4 w-1/5">ایمیل</th>
                                    <th className="text-right py-3 px-4 w-1/5">شماره تلفن</th>
                                    <th className="text-right py-3 px-4 w-1/5">نام</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visibleUsers.map((user, index) => (
                                    <tr
                                        key={index}
                                        className="bg-[#f1f5ff] border-b border-gray-200"
                                    >
                                        <td className="py-3 px-4 text-right flex gap-4 justify-end items-center">
                                            <button
                                                onClick={() => { removeUserHandler(user._id) }}
                                                className="!text-white transition flex !bg-red-600 hover:!bg-red-700 !px-1.5 !py-[2px] rounded-lg"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                                <p>حذف کاربر</p>
                                            </button>
                                        </td>
                                        <td className="py-3 px-4 text-right">کاربر</td>
                                        <td className="py-3 px-4 text-right truncate">{user.email}</td>
                                        <td className="py-3 px-4 text-right">{user.phoneNumber}</td>
                                        <td className="py-3 px-4 text-right">{user.username}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* مشاهده بیشتر */}
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
                    )}
                </div>
            </div>
        </div>
    )
}
