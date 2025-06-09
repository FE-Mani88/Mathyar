'use client'
import React from 'react'
import { Trash2, Users } from 'lucide-react'
import Swal from 'sweetalert2'

export default function LastUsers({ users }) {

    const removeUserHandler = () => {
        Swal.fire({
            title: 'آیا از حذف این کاربر اطمینان دارید؟',
            showDenyButton: true,
            showCancelButton: true,
            cancelButtonText: 'لغو',
            showConfirmButton: false,
            denyButtonText: `حذف`,
            icon: 'warning'
        }).then((result) => {
            if (result.isDenied) {
                Swal.fire({
                    title: '(: کاربر حذف شد ',
                    icon: 'success',
                    confirmButtonText: 'متوجه شدم'
                })
            } else {
                Swal.fire({
                    title: '!تغییرات ذخیره نشد',
                    icon: 'info',
                    confirmButtonText: 'متوجه شدم'
                })
            }
        });
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="bg-[#f1f5ff] rounded-lg shadow-sm mt-10 ltr">
                <div className="p-6">
                    <div className="flex flex-wrap justify-between items-center mb-6">
                        <div className="text-sm text-gray-600 mb-4 md:mb-0 mx-auto sm:mx-0 ">
                            سه کاربر آخری که به تازگی ثبت نام کرده اند
                        </div>
                        <button className="!bg-blue-600 !mx-auto sm:!mx-0 !text-white !px-4 !py-2 flex gap-1.5 !rounded-lg hover:!bg-blue-700 transition-colors">
                            <Users />
                            <p>آخرین کاربران</p>
                        </button>
                    </div>

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
                                {users.map((user, index) => (
                                    <tr
                                        key={index}
                                        className="bg-[#f1f5ff] border-b border-gray-200"
                                    >
                                        <td className="py-3 px-4 text-right flex gap-4 justify-end items-center">
                                            <button onClick={removeUserHandler} className={`!text-white transition flex !bg-red-600 hover:!bg-red-700 !px-1.5 !py-[2px] rounded-lg`}>
                                                <Trash2 className="w-5 h-5" />
                                                <p>حذف کاربر</p>
                                            </button>
                                            {/* <button className="!text-blue-600 hover:!text-blue-800 transition flex bg-[#2c2f3b] !px-1.5 !py-[2px] rounded-lg">
                                                    <ArrowUp className="w-5 h-5" />
                                                    <p>ارتقای کاربر</p>
                                                </button> */}
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
                </div>
            </div>
        </div>
    )
}
