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

  const [mainQuizzesResults, users] = await Promise.all([
    quizResultModel.find({ user: user._id }).populate('user quiz'),
    userModel.find({})
  ]);

  const calculateUserAveragePercentage = () => {
    const totalPercentage = mainQuizzesResults.reduce(
      (sum, quiz) => sum + (quiz.correctAnswersPercentage || 0),
      0
    );
    return mainQuizzesResults.length
      ? (totalPercentage / mainQuizzesResults.length).toFixed(2)
      : '0';
  };

  const allCorrectAnswersCalc = () => {
    return mainQuizzesResults.reduce(
      (sum, quiz) => sum + (quiz.correctAnswersNumber || 0),
      0
    );
  };

  const totalCorrect = allCorrectAnswersCalc();

  const stats = [
    {
      title: "نشان فعال‌ترین کاربران",
      count: mainQuizzesResults.length,
      icon: <Star className='text-indigo-500' />,
      iconBg: 'bg-indigo-100'
    },
    {
      title: "نشان پر امتیازترین کاربران",
      count: mainQuizzesResults.length
        ? ((totalCorrect / mainQuizzesResults.length) * 100).toFixed(2)
        : 0,
      icon: <Trophy className='text-yellow-500' />,
      iconBg: 'bg-yellow-100'
    },
    {
      title: "نشان پر درست‌ترین کاربران",
      count: totalCorrect,
      icon: <CheckCircle className='text-green-500' />,
      iconBg: 'bg-green-100'
    },
    {
      title: "نشان پر پیشرفت‌ترین کاربران",
      count: `${calculateUserAveragePercentage()}%`,
      icon: <ChartArea className='text-red-500' />,
      iconBg: 'bg-red-100'
    }
  ];

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

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded p-4 shadow">
                <div className='flex justify-between items-center'>
                  <div className="text-sm text-gray-500">{stat.title}</div>
                  <div className={`w-10 h-10 flex items-center justify-center rounded-md ${stat.iconBg}`}>
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

      <div className="px-6 mt-10">
        <h2 className="!text-xl !mb-4">برترین کاربران</h2>
        <div className="space-y-4">
          {users.map((userItem, index) => {
            const userResults = mainQuizzesResults.filter(
              (q) => q.user._id.toString() === userItem._id.toString()
            );

            const correctAnswers = userResults.reduce(
              (sum, quiz) => sum + (quiz.correctAnswersNumber || 0),
              0
            );

            const score = userResults.length
              ? ((correctAnswers / userResults.length) * 100).toFixed(2)
              : 0;

            const registeredAt = userItem.createdAt
              ? new Date(userItem.createdAt).toLocaleDateString('fa-IR')
              : 'نامشخص';

            return (
              <div
                key={index}
                className="bg-white shadow rounded-lg p-4 flex items-center justify-between hover:shadow-lg transition-all border"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center relative">
                    <Crown className={`w-5 h-5 mb-1 absolute -top-5 ${index + 1  === 1 ? 'text-yellow-400 ' : index + 1 <= 3 ? 'text-gray-500': index + 1 <= 10 ? 'text-orange-500': '!hidden'}`} />
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

                  {/* <div className='bg-indigo-400'>Here...</div> */}
                </div>


                <div className="flex flex-col items-end gap-1 text-sm text-right">
                  <div className="text-gray-600">تعداد آزمون‌ها: <span className="font-medium">{userResults.length}</span></div>
                  <div className="text-gray-600">پاسخ‌های درست: <span className="font-medium">{correctAnswers}</span></div>
                  <div className="text-gray-600">امتیاز: <span className="font-medium">{score}%</span></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </UserPanelLayout>
  );
}
