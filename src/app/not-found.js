'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/modules/ThemeToggle/ThemeToggle";

const Error10 = () => {
  const [isDark, setIsDark] = useState(null)
  
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark')
      document.cookie = "theme=dark; path=/; max-age=31536000" // 1 سال
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light')
      document.cookie = "theme=light; path=/; max-age=31536000" // 1 سال
    }
  }, [isDark]);

  return (
    <div className="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      <div className="w-full lg:w-1/2">
        <img className="hidden lg:block" src="https://i.ibb.co/v30JLYr/Group-192-2.png" alt="" />
      </div>
      <div className="w-full lg:w-1/2">
        <h1 className="py-4 !text-3xl lg:!text-4xl !font-extrabold !text-gray-800 dark:!text-white rtl">صفحه مورد نظر شما یافت نشد!</h1>
        <p className="py-4 text-base dark:!text-white text-gray-800 rtl">متاسفیم! به نظر می رسد صفحه مورد نظر شما یافت نشده است.</p>
        <p className="py-2 text-base dark:!text-white text-gray-800 rtl">صفحه ای که شما به آن مراجعه کرده اید در وبسایت ما وجود ندارد. می توانید با استفاده از لینک زیر به صفحه اصلی سایت بازگردید.</p>
        <Link href='/' >
          <button className="w-full !flex !justify-center lg:!w-auto !my-4 border rounded-md !px-1 sm:!px-16 !py-5 !bg-indigo-600  !text-white hover:!bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50 rtl flex min-w-full !text-center">
            <p className="flex mx-auto">
              بازگشت به خانه
            </p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error10;

