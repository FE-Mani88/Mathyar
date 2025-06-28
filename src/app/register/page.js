'use client'
import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Phone } from 'lucide-react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';

function Register() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [allErrors, setAllErrors] = useState(null);

  const submitHandler = async (event) => {
    event.preventDefault();
    const newUser = {
      username: event.target[0].value,
      phoneNumber: event.target[1].value,
      email: event.target[2].value,
      password: event.target[3].value,
    };

    try {
      if (newUser.username?.trim().length < 4 || newUser.phoneNumber?.trim().length < 11 || newUser.email?.trim().length < 10 || newUser.password?.trim().length < 8) {
        return toast.error('Please fill out all the inputs :(');
      }

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        toast.success('You have registered successfully :)');

        setTimeout(() => {
          router.push('/user-panel');
        }, 2500);
      } else if (res.status === 422) {
        toast.error('This user was registered before !');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="cnplf h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-6 overflow-x-hidden">
        <style>
          {`
            ::-webkit-scrollbar {
              width: 4px;
              z-index: 1000
            }
            ::-webkit-scrollbar-track {
              background: #3b3939;
              border-radius: 4px;
            }
            ::-webkit-scrollbar-thumb {
              background: #bbbfbd;
              border-radius: 4px;
            }
            ::-webkit-scrollbar-thumb:hover {
              background: #718096;
            }
          `}
        </style>
        <div className="c5sfa c307p c1sv4 cavhb cnmzr !hidden md:!flex overflow-hidden" aria-hidden="true" style={{ position: 'absolute', zIndex: 0, maxHeight: '100vh' }}>
          <img src="https://preview.cruip.com/neon/images/hero-illustration.svg" className="cy2lr" width={2143} height={737} alt="Hero Illustration" style={{ maxHeight: '100vh', objectFit: 'cover', opacity: 0.7 }} />
        </div>
        <div className="max-w-md w-full bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-8 space-y-7 border border-gray-700/50 relative overflow-hidden transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]" style={{ zIndex: 1 }}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

          <div className="text-center space-y-2">
            <h1 className="!text-2xl sm:!text-4xl !font-semibold sm:!font-bold !bg-gradient-to-r from-blue-400 to-indigo-400 !bg-clip-text !text-transparent">ساخت حساب کاربری</h1>
            <p className="!text-gray-400 !text-lg mt-1">به جمع ما بپیوندید</p>
          </div>

          <form className="space-y-5" onSubmit={submitHandler}>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className={`relative bottom-1 h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors duration-200 ${allErrors?.username ? 'relative sm:bottom-4 bottom-4' : null}`} />
              </div>
              <input
                type="text"
                name="username"
                placeholder="نام کاربری"
                className="block w-full !pl-10 !pr-3 !py-3.5 !bg-gray-700/50 border !border-gray-600 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !text-white !placeholder-gray-400 transition-all duration-200 hover:!bg-gray-700/70"
              />
              <p className='text-[15px] sm:text-[17px] text-red-400 text-center pt-3'>
                {allErrors?.username ? allErrors?.username : null}
              </p>
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className={`relative bottom-1 h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors duration-200 ${allErrors?.phoneNumber ? 'relative sm:bottom-4 bottom-4' : null}`} />
              </div>
              <input
                type="text"
                name="phoneNumber"
                placeholder="شماره تلفن"
                className="block w-full !pl-10 !pr-3 !py-3.5 !bg-gray-700/50 border !border-gray-600 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !text-white !placeholder-gray-400 transition-all duration-200 hover:!bg-gray-700/70"
              />
              <p className='text-[15px] sm:text-[17px] text-red-400 text-center pt-3'>
                {allErrors?.phoneNumber ? allErrors?.phoneNumber : null}
              </p>
            </div>

            <div className="relative group">
              <div className="absolute !inset-y-0 !left-0 !pl-3 flex items-center pointer-events-none">
                <Mail className={`relative bottom-1 h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors duration-200 ${allErrors?.email ? 'relative sm:bottom-5 bottom-3' : null}`} />
              </div>
              <input
                type="email"
                name="email"
                placeholder="آدرس ایمیل"
                className="!placeholder-gray-400 block w-full !pl-10 !pr-3 !py-3.5 !bg-gray-700/50 border !border-gray-600 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !text-white placeholder-gray-400 transition-all duration-200 hover:!bg-gray-700/70"
              />
              <p className='text-[15px] sm:text-[17px] text-red-400 text-center pt-3'>
                {allErrors?.email ? allErrors?.email : null}
              </p>
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className={`relative bottom-1 h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors duration-200 ${allErrors?.password ? 'relative sm:bottom-4 bottom-7' : null}`} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="گذرواژه"
                className="block w-full !pl-10 !pr-12 !py-3.5 !bg-gray-700/50 border !border-gray-600 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !text-white !placeholder-gray-400 !transition-all duration-200 hover:bg-gray-700/70"
              />
              <p className='text-[15px] sm:text-[17px] text-red-400 text-center pt-3'>
                {allErrors?.password ? allErrors?.password : null}
              </p>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 !pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className={`h-5 w-5 text-gray-400 relative bottom-1 hover:text-gray-300 transition-colors cursor-pointer ${allErrors?.password ? 'relative sm:bottom-5 bottom-[20px]' : null}`} />
                ) : (
                  <Eye className={`h-5 w-5 text-gray-400 relative bottom-1 hover:text-gray-300 transition-colors cursor-pointer ${allErrors?.password ? 'relative sm:bottom-5 bottom-7' : null}`} />
                )}
              </button>
            </div>

            {allErrors?.api && (
              <p className='text-[15px] sm:text-[17px] text-red-400 text-center'>
                {allErrors.api}
              </p>
            )}

            <button
              type="submit"
              className="w-full !bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 !text-white !py-3.5 !rounded-xl !font-semibold text-lg hover:scale-[1.02] transform transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 active:scale-[0.98]"
            >
              ثبت نام
            </button>
          </form>

          <div className="text-center">
            <p className="text-gray-400 rtl">
              قبلا ثبت نام کرده اید؟
              <Link href="login" className="!text-blue-400 mr-1 hover:!text-blue-300 font-semibold transition-colors duration-200">
                وارد شوید
              </Link>
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700/50"></div>
            </div>
            <div className="relative flex justify-center !text-sm">
              <span className="!px-3 !bg-gray-800/80 !text-gray-400 rtl">
                و یا بازگردید با: <Link className='!text-blue-500' href='/'>صفحه اصلی</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Register;