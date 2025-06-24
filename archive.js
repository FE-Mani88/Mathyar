// {/* <div className="max-w-5xl mx-auto">
//   <div className="mb-8">
//     <h1 className="text-2xl font-semibold mb-4">برنامه‌نویسان حماسی</h1>
//     <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//       <div className="flex items-center gap-2">
//         <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">فعال</span>
//       </div>
//       <div>ارز: دلار</div>
//       <div>منطقه زمانی: آمریکا - نیویورک</div>
//       <div>طرح: تیم ۱۰ نفره (حرفه‌ای) ماهانه</div>
//     </div>
//   </div>

//   <div className="bg-white rounded-lg shadow-sm">
//     <div className="p-6">
//       <div className="flex flex-wrap justify-between items-center mb-6">
//         <div className="text-sm text-gray-600 mb-4 md:mb-0">
//           ۴ یکپارچه‌سازی فعال برای این سازمان
//         </div>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
//           افزودن یکپارچه‌سازی
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="border-b">
//               <th className="text-right py-3 px-4">نام</th>
//               <th className="text-right py-3 px-4">نوع</th>
//               <th className="text-right py-3 px-4">آخرین همگام‌سازی</th>
//               <th className="text-right py-3 px-4">عملیات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.name} className="border-b last:border-0">
//                 <td className="py-3 px-4">
//                   <div className="flex items-center gap-2 justify-end">
//                     <span>{user.name}</span>
//                     <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
//                       {typeof user.icon === "string" ? user.icon : user.icon}
//                     </div>
//                   </div>
//                 </td>
//                 <td className="py-3 px-4 text-right">{user.type}</td>
//                 <td className="py-3 px-4 text-right">{user.lastSync}</td>
//                 <td className="py-3 px-4">
//                   <div className="flex gap-2 justify-end">
//                     <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                       <RefreshCcw className="h-4 w-4" />
//                     </button>
//                     <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                       <Trash2 className="h-4 w-4" />
//                     </button>
//                     <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                       <Archive className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>
// </div>


// ////////////////////////////////////////
// // const user = await authUser()

// // const submitQuizResultHandler = async () => {
// //     const res = await fetch('/api/quizzesResults', {
// //         method: "POST",
// //         headers: {
// //             'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify({
// //             correctAnswersPercentage: percentage,
// //             correctAnswersNumber: score,
// //             user: user
// //         })
// //     })
// // }



// const projects = [
//   { name: "Dropbox Design System", hours: 34, priority: "Medium", progress: 15 },
//   { name: "Slack Team UI Design", hours: 47, priority: "High", progress: 35 },
//   { name: "GitHub Satellite", hours: 120, priority: "Low", progress: 75 },
//   { name: "3D Character Modelling", hours: 89, priority: "Medium", progress: 63 },
//   { name: "Webapp Design System", hours: 108, priority: "Track", progress: 100 },
// ];

// <div className="bg-white p-8 rounded shadow">
//                         {/* <h2 className="text-lg font-bold mb-4">Active Projects</h2> */}
//                         <div className="grid grid-cols-6 font-semibold text-gray-600 border-b pb-2">
//                             <div>نام آزمون</div>
//                             <div>مدت زمان</div>
//                             <div>درجه سختی</div>
//                             <div>تعداد پاسخ های درست</div>
//                             <div>درصد پاسخ های درست</div>
//                             <div>مشاهده کارنامه</div>
//                         </div>
//                         {mainQuizzesResults.map((quizResult, index) => (
//                             <div key={index} className="grid grid-cols-6 items-center py-3 border-b text-sm">
//                                 <div>{quizResult.quiz.title}</div>
//                                 <div>{quizResult.quiz.duration} دقیقه</div>
//                                 <div>
//                                     <span className={`px-2 py-1 rounded text-white text-xs ${quizResult.quiz.difficulty === 'High' ? 'bg-red-500' :
//                                         quizResult.quiz.difficulty === 'medium' ? 'bg-yellow-500' :
//                                             quizResult.quiz.difficulty === 'easy' ? 'bg-blue-500' :
//                                                 'bg-green-500'
//                                         }`}>{quizResult.quiz.difficulty === 'easy' ? 'آسان' : quizResult.quiz.difficulty === 'medium' ? 'متوسط' : 'سخت'}</span>
//                                 </div>
//                                 <div>
//                                     {quizResult.correctAnswersNumber} پاسخ درست
//                                 </div>

//                                 <div className="flex items-center gap-2">
//                                     <span>{quizResult.correctAnswersPercentage}%</span>
//                                     <div className="w-24 bg-gray-200 h-2 rounded">
//                                         <div className="bg-purple-600 h-2 rounded" style={{ width: `${quizResult.correctAnswersPercentage}%`, backgroundColor: `${quizResult.correctAnswersPercentage >= 80 ? '#4CAF50' : quizResult.correctAnswersPercentage >= 50 ? '#C0CA33' : quizResult.correctAnswersPercentage >= 30 ? '#FF9800' : '#E53935'}` }}></div>
//                                     </div>
//                                 </div>
//                                 {/*  */}
//                                 <div className='bg-[#624bff] w-max px-3 text-white rounded-sm !py-1.5'>
//                                     <button>
//                                         مشاهده کارنامه
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}

//                         {!mainQuizzesResults.length && (
//                             <div className='!mt-8 text-center'>
//                                 هنوز در آزمونی شرکت نکرده اید!
//                             </div>
//                         )}
//                     </div>

































import React from 'react';
import UserPanelLayout from '@/components/layouts/UserPanelLayout/UserPanelLayout';
import { Star, Trophy, CheckCircle, ChartArea, Crown } from 'lucide-react';
import { authUser } from '@/utils/serverheplers';
import connectToDB from '../../../../configs/connectToDB';
import quizResultModel from '../../../../models/QuizResults';
import userModel from '../../../../models/Users';
import Link from 'next/link';

export default async function Page() {
  await connectToDB();
  const user = await authUser();

  if (!user) {
    return (
      <div className="p-8 text-center text-red-600 text-lg">
        لطفاً وارد حساب کاربری خود شوید.
      </div>
    );
  }

  const [mainQuizzesResults, allUsers] = await Promise.all([
    quizResultModel.find({}).populate('user quiz'),
    userModel.find({})
  ]);

  const usersWithStats = allUsers.map(userItem => {
    const userResults = mainQuizzesResults.filter(
      (q) => q.user && q.user._id?.toString() === userItem._id.toString()
    );

    const correctAnswers = userResults.reduce(
      (sum, quiz) => sum + (quiz.correctAnswersNumber || 0),
      0
    );

    const score = userResults.length
      ? (correctAnswers / userResults.length) * 100
      : 0;

    return {
      ...userItem._doc,
      correctAnswers,
      quizCount: userResults.length,
      score: score.toFixed(2)
    };
  });

  // مرتب‌سازی کاربران بر اساس امتیاز (بیشترین به کمترین)
  const sortedUsers = usersWithStats.sort((a, b) => b.score - a.score);

  return (
    <UserPanelLayout>
      <div className='bg-[#624bff] py-4'>
        <div className='px-6'>
          <div className="flex justify-between items-center mb-6">
            <h1 className="!text-2xl text-white">آمار کلی کاربران</h1>
            <Link href='/select'>
              <button className="bg-white text-black !px-4 !py-2 rounded">
                شرکت در آزمون جدید
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="px-6 mt-10">
        <h2 className="!text-xl !mb-4">برترین کاربران</h2>
        <div className="space-y-4">
          {sortedUsers.map((userItem, index) => {
            const registeredAt = userItem.createdAt
              ? new Date(userItem.createdAt).toLocaleDateString('fa-IR')
              : 'نامشخص';

            return (
              <div
                key={userItem._id}
                className="bg-white shadow rounded-lg p-4 flex items-center justify-between hover:shadow-lg transition-all border"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center relative">
                    <Crown className={`w-5 h-5 mb-1 absolute -top-5 ${index + 1 === 1 ? 'text-yellow-400' : index + 1 <= 3 ? 'text-gray-500' : index + 1 <= 10 ? 'text-orange-500' : '!hidden'}`} />
                    <div className={`w-12 h-12 rounded-sm text-white flex items-center justify-center text-xl font-bold ${index + 1 === 1
                      ? 'bg-yellow-400'
                      : index + 1 <= 3
                        ? 'bg-gray-400'
                        : index + 1 <= 10
                          ? 'bg-orange-400'
                          : 'bg-blue-500'
                      }`}>
                      {index + 1}
                    </div>
                  </div>

                  <div className="w-12 h-12 rounded-full bg-[#624bff] text-white flex items-center justify-center text-xl font-bold">
                    {userItem.username?.[0]?.toUpperCase() || '؟'}
                  </div>

                  <div>
                    <div className="text-lg font-semibold">{userItem.username || 'بدون نام'}</div>
                    <div className="text-sm text-gray-500">تاریخ ثبت‌نام: {registeredAt}</div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 text-sm text-right">
                  <div className="text-gray-600">تعداد آزمون‌ها: <span className="font-medium">{userItem.quizCount}</span></div>
                  <div className="text-gray-600">پاسخ‌های درست: <span className="font-medium">{userItem.correctAnswers}</span></div>
                  <div className="text-gray-600">امتیاز: <span className="font-medium">{userItem.score}%</span></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </UserPanelLayout>
  );
}
