import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, BookOpen, BarChart, CheckCircle } from 'lucide-react';
import { DIFFICULTY_COLORS } from '@/utils/constants';

export default function QuizCard({ id, title, description, difficulty, duration, totalQuestions, imageUrl }) {

    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
      });

    useEffect(() => {
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }, [isDark]);

    return (
        <>
            <Link href={`/quiz/${id}`} data-aos='fade-up' className="block transform translate-y-[100px] transition-all !duration-300">
                <div initial="hidden"
                    transition={{ duration: 0.5 }} className="bg-white dark:bg-[#293546] rounded-xl shadow-lg overflow-hidden"
                >
                    <div className="h-48 overflow-hidden">
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-3 rtl">
                            <h3 className="!text-xl !font-bold text-gray-900 dark:text-gray-200">{title}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${DIFFICULTY_COLORS[difficulty]}`}>
                                {difficulty === 'hard' ? 'سخت' : difficulty === 'medium' ? 'متوسط' : 'آسان'}
                            </span>
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-2 dark:text-gray-300 rtl">{description}</p>
                        <div className="flex items-center justify-between text-gray-500 mt-4 !z-10">
                            <div className="flex items-center space-x-2 gap-1 dark:text-white">
                                <Clock className="w-4 h-4" />
                                <span className='flex gap-1'>
                                    <p>دقیقه</p>
                                    {duration}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2 dark:text-white gap-1">
                                <BookOpen className="w-4 h-4" />
                                <span className='flex gap-1'> <p>سوال</p> {totalQuestions} </span>
                            </div>
                            <div className="flex items-center gap-1 space-x-2 dark:text-white">
                                <BarChart className="w-4 h-4" />
                                <span>{difficulty === 'hard' ? 'سخت' : difficulty === 'medium' ? 'متوسط' : 'آسان'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}
