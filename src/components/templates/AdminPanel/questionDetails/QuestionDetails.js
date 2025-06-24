// 'use client'
// import React from 'react'

// export default function QuestionDetails() {
//     return (
//         <div className="max-w-3xl mx-auto bg-white !p-6 rounded-xl shadow-md mt-8 !space-y-5">
//             <div className='flex justify-between items-center'>
//                 <h2 className="bg-indigo-100 text-indigo-600 !px-2 !py-1 rounded-[3px] mb-4">جزئیات تیکت</h2>
//                 <div className='flex gap-2'>
//                     <button
//                         onClick={handleRefresh}
//                         className="select-none bg-indigo-500 hover:bg-indigo-600 transition !text-white !px-2 !py-1 rounded-sm flex items-center gap-2 disabled:opacity-50"
//                         disabled={isRefreshing}
//                     >
//                         {isRefreshing ? 'در حال بروزرسانی...' : 'تازه‌سازی چت'}
//                         {isRefreshing && (
//                             <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
//                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
//                                 <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
//                             </svg>
//                         )}
//                         <RefreshCcw className={`w-4 h-4 ${!isRefreshing ? '' : '!hidden'}`} />
//                     </button>
//                     <button onClick={closeTicketHandler} className="select-none bg-red-500 hover:bg-red-600 transition !text-white !px-2 !py-1 rounded-sm">
//                         بستن تیکت
//                     </button>
//                 </div>
//             </div>

//             <div className="mb-6 !space-y-2">
//                 <p><strong>موضوع:</strong> ticket.subject</p>
//                 <p><strong>متن:</strong> ticket.body</p>
//                 <p><strong>شماره تماس کاربر:</strong> </p>
//                 <p><strong>وضعیت:</strong> <span></span></p>
//             </div>
//         </div>
//     )
// }
