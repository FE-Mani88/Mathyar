'use client'
import React, { useState, useEffect } from 'react'
import { LogIn, User, Telescope, Search, Flame, Timer, Brain, Wifi, AlignJustify, ChevronUp, ChevronLeft, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import SideBar from '@/components/modules/SideBar/SideBar'

export default function Header({ isUserRegistered, user }) {
    const [isDark, setIsDark] = useState(true);
    const [isSideBarActive, setIsSideBarActive] = useState(false)

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
        <>
            <header className={`cvtc3 c0ayg c307p `} >
                <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
                <div className={`cbl28 c0g2c coaq6 cb0ik items-center flex rtl !justify-between flex-row ${isUserRegistered ? ' flex justify-end items-center flex-row-reverse' : 'sm:![direction:ltr]'}`}>
                    {/* Start Search Box */}
                    <div className={`hidden md:flex ltr relative left-[40px] sm:left-0 mr-[40px] h-[35px] sm:h-[50px] items-center ${!isUserRegistered ? '!hidden md:!flex' : null} `}>
                        <div className='h-full bg-white text-black p-1 rounded-l-[20%] sm:rounded-l-[30%] h-[100%] w-10 flex justify-center items-center hover:!bg-gray-300 transition-all cursor-pointer'>
                            <Search />
                        </div>
                        <input style={{ padding: '8px', height: '100%', border: 'solid white 1px' }} className='rtl w-40 sm:w-60 rounded-r-md sm:rounded-r-lg' placeholder='به دنبال چه می گردید؟ سرچ کنید' />
                    </div>
                    {/* End Search Box */}
                    <div className={`chip0 cglp6 c4mnq cd10w cdoit sm:mx-0 flex ${isUserRegistered ? ' flex justify-between gap-[800px]' : ''}`}>

                        <nav className="chip0 cxgjn flex items-center">
                            <ul className={`chip0 cxgjn cutr6 c4mnq cbv5p gap-x-3 ${isUserRegistered ? 'ltr !hidden sm:!flex' : 'ltr'}`}>
                                {isUserRegistered ? (
                                    <>
                                        <li className={`c8h5l text-lg border-bottom-1 text-black dark:text-gray-200 flex items-center cursor-pointer !transition-all duration-150 hover:text-gray-400 ${user.role === 'ADMIN' ? '!hidden' : ''}`}>
                                            <ChevronDown className='w-5 h-5' />
                                            <Link href={`/user-panel/user-tickets`}>
                                                <span>پشتیبانی</span>
                                            </Link>
                                        </li>
                                        <li className='c8h5l text-lg border-bottom-1 text-black dark:text-gray-200 flex items-center cursor-pointer !transition-all duration-150 hover:text-gray-400'>
                                            <ChevronDown className='w-5 h-5' />
                                            <Link href={user.role === 'USER' ? '/user-panel' : 'admin-panel'}>
                                                <span>داشبورد</span>
                                            </Link>
                                        </li>
                                        <li className='c8h5l text-lg border-bottom-1 text-black dark:text-gray-200 flex items-center cursor-pointer !transition-all duration-150 hover:text-gray-400'>
                                            <ChevronDown className='w-5 h-5' />
                                            <Link href='/select'>
                                                <span>آزمون ها</span>
                                            </Link>
                                        </li>
                                        <li className='c8h5l text-lg border-bottom-1 text-black dark:text-gray-200 flex items-center cursor-pointer !transition-all duration-150 hover:text-gray-400'>
                                            <ChevronDown className='w-5 h-5' />
                                            <Link href='/about-us'>
                                                <span>درباره ما</span>
                                            </Link>
                                        </li>
                                        <li className='c8h5l text-lg border-bottom-1 text-black dark:text-gray-200 flex items-center cursor-pointer !transition-all duration-150 hover:text-gray-400'>
                                            <ChevronDown className='w-5 h-5' />
                                            <Link href='/'>
                                                <span>صفحه اصلی</span>
                                            </Link>
                                        </li>
                                        <li className='c8h5l'>
                                            <img className='w-28 sm:w-60 mt-2' src="/images/mathyarLogo.png" alt="#" />
                                        </li>
                                    </>

                                ) : (
                                    <>
                                        <li className='c8h5l'>
                                            <Link className="sm:!px-4 !px-2 chip0 c4mnq c5mpl chs2t cazq3 ckdyj cdm1x c6m7s ckwz7 cysah cua40 make-btn"
                                                href="/register">
                                                <p className='txt-margin !text-[11.1px] sm:!text-[18px] '> ساخت اکانت  </p>
                                                <User />
                                            </Link>
                                        </li>
                                        <li className="c8h5l">
                                            <Link className="sm:!px-4 !px-2 !text-[11.2px] sm:!text-[18px] c2pi2 c0ayg c4wey cl6ef cf4pm cqbpd cxmkl c4aul c76qn" href="login">
                                                ورود به اکانت <span className="cfe40 cr1tk c56im cv73b c6m7s ckwz7 ccx8x"><LogIn /></span>
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                            {isUserRegistered ? (
                                <div className='sm:hidden' onClick={() => {
                                    if (isSideBarActive) {
                                        setIsSideBarActive(false)
                                    } else {
                                        setIsSideBarActive(true)
                                    }
                                }}>
                                    <AlignJustify id='navbar-menu-icon' style={{ color: '#838e9d', cursor: 'pointer' }} />
                                </div>
                            ) : null}
                        </nav>

                    </div>
                </div>

                {/* Sidebar */}
                <div className='transition-all'>
                    <SideBar isOpen={isSideBarActive} user={user} />
                </div>
                {/* End Sidebar */}
            </header >
        </>
    )
}
