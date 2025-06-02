'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/modules/Navbar/Navbar'
import QuizCard from '@/components/modules/QuizCard/QuizCard';
import Footer from '@/components/templates/Index/Footer/Footer';
import { GraduationCap } from 'lucide-react'
import Link from 'next/link';

export default function Select() {

  const [user, setUser] = useState(undefined)
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [quizzes, setQuizzes] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch('/api/auth/getme', {
        cache: 'no-store'
      })
      const data = await res.json()

      if (res.ok) {
        setUser(data)
      } else {
        setUser(false)
      }
    }

    getUser()
  }, [])

  useEffect(() => {
    const fetchHandler = async () => {
      const res = await fetch('/api/quizzes', {
        cache: 'no-store'
      })

      const data = await res.json()

      if (res.ok) {
        setQuizzes(data)
      }
    }

    fetchHandler()
  }, [])

  const filteredQuizzes = selectedGrade ? quizzes.filter(quiz => {
    return quiz.grade == selectedGrade
  }) : quizzes

  if (user === undefined || quizzes === null) {
    return (
      <div className={`loading-container h-[100vh] flex justify-center items-center ${true ? 'loading' : ''}`}>
        <div className="loader"></div>
      </div>
    )
  }

  if (user === false) {
    return (
      <div className="min-h-screen bg-[#111827] flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-md w-full transform hover:scale-105 transition-transform duration-300 py-10">
          <div className="!space-y-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              قبل از استفاده از این صفحه باید ثبت نام کنید
            </h1>
            <p className="text-gray-600 mt-4">لطفا به صفحه ثبت نام بروید</p>
            <Link href="/register">
              <button className="w-full !text-white !bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold !py-3 !px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg">
                ثبت نام کنید
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }


  if (user) {
    return (
      <>
        <Navbar isUserRegistered={JSON.parse(JSON.stringify(user)) ? true : false} user={JSON.parse(JSON.stringify(user))} />
        <div className='min-h-screen bg-gray-50 dark:!bg-[#1a2331] transition-all scroll-y-hidden bg-[./images/codes.png]'>
          {/* Start Illustration */}
          <div className="c5sfa c307p c1sv4 cavhb cnmzr" aria-hidden="true">
            <img src="https://preview.cruip.com/neon/images/hero-illustration.svg" className="cy2lr" width={2143} height={737} alt="Hero Illustration" />
          </div>
          {/* End Illustration */}
          <div className="">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center mb-12 mt-16">
                <h1 className="!text-4xl !gap-1 !font-bold text-gray-900 !mb-4 flex items-center justify-center dark:text-white">
                  <GraduationCap className="w-10 h-10 mr-3 dark:text-white" />
                  پلتفرم آزمون های ریاضی
                  <GraduationCap className="w-10 h-10 mr-3 dark:text-white" />
                </h1>
                <p className="!text-xl text-gray-600 dark:text-gray-300">
                  پایه تحصیلی خود را انتخاب کنید و آزمون مورد نظر خود را انتخاب کنید
                </p>
              </div>

              {/* Start Filter Buttons */}
              <div className="flex justify-center gap-4 mb-12" data-aos='fade-up'>
                {[7, 8, 9].map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(selectedGrade === grade ? null : grade)}
                    className={`dark:!text-white !px-6 !py-3 !bg-gray-400 dark:!bg-gray-600 rounded-lg font-medium transition-colors ${selectedGrade === grade
                      ? '!bg-blue-600 !bg-sky-600 !text-white dark:!bg-gray-900'
                      : 'text-gray-700 hover:!bg-sky-500 hover:!text-white dark:!bg-gray-700 dark:hover:!bg-gray-800 dark:hover:!text-gray-300'
                      }`}
                  >
                    پایه  {grade === 9 ? 'نهم' : grade === 8 ? 'هشتم' : 'هفتم'}
                  </button>
                ))}
              </div>
              {/* End Filter Buttons */}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredQuizzes?.map((quiz, index) => (
                  <QuizCard key={index} {...quiz} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

}