import React from 'react'
import { Check, ShieldUser, Users } from 'lucide-react'

export default function LastAdmins({ admins }) {
    return (
        <div className="max-w-5xl mx-auto">
            <div className="bg-[#f1f5ff] rounded-lg shadow-sm mt-10 ltr">
                <div className="p-6">
                    <div className="flex flex-wrap justify-between items-center mb-6">
                        <div className="text-sm text-gray-600 mb-4 md:mb-0 !mx-auto sm:!mx-0">
                            سه ادمین آخری که به تازگی ثبت نام کرده اند
                        </div>
                        <button className="!bg-blue-600 !text-white !mx-auto sm:!mx-0 !px-4 !py-2 flex gap-1.5 !rounded-lg hover:!bg-blue-700 transition-colors">
                            <ShieldUser />
                            <p>ادمین ها</p>
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
                                {admins.map((admin, index) => (
                                    <tr
                                        key={index}
                                        className="bg-[#f1f5ff] border-b border-gray-200"
                                    >
                                        <td className="py-3 px-4 text-right flex justify-end items-center">
                                            <button className={`!text-white transition flex !bg-green-600 hover:!bg-green-700 !px-1.5 !py-[2px] rounded-lg`}>
                                                {/* <Check className="w-5 h-5" /> */}
                                                <p>عملیاتی موجود نیست</p>
                                            </button>
                                            {/* <button className="!text-blue-600 hover:!text-blue-800 transition flex bg-[#2c2f3b] !px-1.5 !py-[2px] rounded-lg">
                                                    <ArrowUp className="w-5 h-5" />
                                                    <p>ارتقای کاربر</p>
                                                </button> */}
                                        </td>
                                        <td className="py-3 px-4 text-right">ادمین</td>
                                        <td className="py-3 px-4 text-right truncate">{admin.email}</td>
                                        <td className="py-3 px-4 text-right">{admin.phoneNumber}</td>
                                        <td className="py-3 px-4 text-right">{admin.username}</td>
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
