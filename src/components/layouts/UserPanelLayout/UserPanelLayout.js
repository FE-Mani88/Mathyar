'use client';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  ChevronDown,
  ChevronLeft,
  House,
  MessageCircleQuestion,
  Book,
  NotebookPen,
  Heart,
  Mail,
  Volume2,
  Settings2,
  LogOut,
  Loader2,
  Menu,
  Search,
  Send,
  SendIcon,
} from 'lucide-react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { redirect } from 'next/navigation';

export default function UserPanelLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState({});
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userRes = await fetch('/api/auth/getme');
        const userData = await userRes.json();
        setUser(userData);
      } catch (error) {
        console.error('خطا در دریافت اطلاعات کاربر:', error);
      }
    };

    getUser();
  }, []);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const UserLogoutHandler = async () => {
    Swal.fire({
      title: 'آیا از خروج از حساب کاربری خود اطمینان دارید؟',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'بله',
      cancelButtonText: 'بازگشت',
      cancelButtonColor: '#E53935'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch('/api/auth/signout')
        if (res.ok) {
          Swal.fire({
            icon: 'success',
            title: 'با موفقیت خارج شدید',
            showConfirmButton: true,
            confirmButtonText: 'بازگشت به صفحه اصلی'
          }).then(() => {
            redirect('/')
          })
        } else {
          Swal.fire({
            title: 'خطایی در خروج به وجود آمد'
          })
        }
      } else {
        Swal.fire({
          title: 'تغییرات ذخیره نشدند',
          icon: 'info',
          showConfirmButton: true,
          confirmButtonText: 'متوجه شدم'
        })
      }
    })
  }


  // POP-UP

  const popUpHandler = () => {
    if (window.innerWidth >= 640) {
      Swal.fire({
        position: 'top-start',
        width: '320px',
        showConfirmButton: false,
        padding: '0 !important',
        customClass: {
          popup: 'my-swal-popup',
        },

        html: `
      <div dir='rtl' style="width: 278px !important; background: white !important; padding: 20px 20px 14px 20px !important; border-radius: 12px !important; text-align: right !important;">
        <div style="display: flex !important; align-items: center !important; border-bottom: 1px solid #e5e5e5 !important; padding-bottom: 20px !important; margin-bottom: 10px !important;">
          
            <div class='bg-[#624bff] text-white w-[56px] h-[56px] border-none select-none focus:outline-none outline -none rounded-full flex justify-center items-center'>
            ${user.username ? user.username[0].toUpperCase() : '...'}
            </div>

          <div style="margin-right: 14px !important; display: flex !important; flex-direction: column !important; gap: 12px !important; overflow: hidden !important;">
            <span style="font-weight: bold !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important;">${user.username ? user.username : 'در حال لود...'}</span>
            <span style="font-size: 0.875rem !important; font-weight: 500 !important; color:rgb(26, 26, 43) !important;">
              ${user.email ? user.email : 'در حال لود...'}
            </span>
          </div>
        </div>

        <div style='font-size: 16px !important'>
        شماره تلفن: ${user.phoneNumber ? user.phoneNumber : 'در حال لود...'}
        </div>        
      </div>
    `
      });
    }
  };


  return (
    <div dir="rtl" className="min-h-screen bg-[#E6EDFF]">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-lg z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Header */}
      <header className="bg-white border-b fixed top-0 right-0 left-0 z-50 h-14">
        <div className="flex items-center justify-between px-4 py-2 h-full">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-blue-600 font-bold text-xl hidden sm:block">
              Mathyar | پلتفرم آموزش ریاضی
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Start Search Box */}
            <div className="w-64 hidden sm:flex">
              <input
                type="text"
                placeholder="جستجو..."
                style={{borderRadius: '0 6px 6px 0'}}
                className="pl-4 pr-10 py-2 w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-sm bg-white placeholder-gray-400 text-right transition-all"
              />
              <div className="w-12 rounded-l-xl inset-y-0 left-0 flex justify-center items-center cursor-pointer text-white bg-[#2C2F3B] transition-all hover:bg-gray-900">
                <Search className='w-6 h-6' />
              </div>
            </div>
            {/* End Search Box */}

            <div className="flex items-center gap-2">
              <div onClick={popUpHandler} className="select-none w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                {user.username ? (
                  user.username.trim()[0].toUpperCase()
                ) : (
                  <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                )}
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700">
                {user.username ? (
                  user.username
                ) : (
                  <div className="w-20 h-3 bg-gray-300 rounded animate-pulse" />
                )}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`select-none fixed flex flex-col justify-between right-0 top-14 w-64 h-[calc(100vh-3.5rem)] bg-[#2C2F3B] text-white transform transition-transform duration-300 z-50 ${isSidebarOpen
          ? 'translate-x-0'
          : '!translate-x-full md:!translate-x-0 md:translate-x-0'
          }`}
      >

        <div className="p-6">
          <div
            className={`text-xs uppercase tracking-wider text-gray-400 mb-2 ${!user.username ? 'animate-pulse' : ''
              }`}
          >
            سلام {user.username} عزیز
          </div>

          <nav className="space-y-1">
            <div
              onClick={() => toggleSection('integrations')}
              className={`flex justify-between items-center hover:bg-[#363B4D] px-3 py-2 rounded-lg transition-colors cursor-pointer ${openSection === 'integrations' ? 'text-blue-400' : ''
                }`}
            >
              <div className="flex items-center">
                <LayoutDashboard className="h-4 w-4 ml-3" />
                <span>صفحات سایت</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${openSection === 'integrations' ? 'rotate-180' : ''
                  }`}
              />
            </div>
            <div
              className={`pl-2 overflow-hidden transition-all duration-300 ${openSection === 'integrations'
                ? 'max-h-40 opacity-100'
                : 'max-h-0 opacity-0'
                } space-y-1 text-sm text-gray-300`}
            >
              <Link
                href="/"
                className="flex rounded-lg px-1 hover:bg-[#363B4D] justify-between hover:text-white !py-2"
              >
                <div className="flex items-center gap-1.5 justify-center">
                  <House className="w-5 h-5" />
                  <p>صفحه اصلی</p>
                </div>
                <ChevronLeft className="w-4 h-4" />
              </Link>
              <Link
                href="/select"
                className="flex rounded-lg px-1 hover:bg-[#363B4D] justify-between hover:text-white !py-2"
              >
                <div className="flex items-center gap-1.5 justify-center">
                  <MessageCircleQuestion className="w-5 h-5" />
                  <p>آزمون ها</p>
                </div>
                <ChevronLeft className="w-4 h-4" />
              </Link>
              <Link
                href="/about-us"
                className="flex rounded-lg px-1 hover:bg-[#363B4D] justify-between hover:text-white !py-2"
              >
                <div className="flex items-center gap-1.5 justify-center">
                  <Book className="w-5 h-5" />
                  <p>درباره ما</p>
                </div>
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>

            <Link
              href="/user-panel"
              className="flex items-center text-gray-400 hover:bg-[#363B4D] hover:text-white px-3 py-2 rounded-lg transition-colors"
            >
              <House className="h-4 w-4 ml-3" />
              <span>داشبورد</span>
            </Link>



            <a
              href="#"
              className="flex items-center text-gray-400 hover:bg-[#363B4D] hover:text-white px-3 py-2 rounded-lg transition-colors"
            >
              <NotebookPen className="h-4 w-4 ml-3" />
              <span>آزمون های داده شده</span>
            </a>
            <a
              href="#"
              className="flex items-center text-gray-400 hover:bg-[#363B4D] hover:text-white px-3 py-2 rounded-lg transition-colors"
            >
              <Heart className="h-4 w-4 ml-3" />
              <span>علاقه مندی ها</span>
            </a>
            <Link
              href="/user-panel/user-tickets"
              className="flex items-center text-gray-400 hover:bg-[#363B4D] hover:text-white px-3 py-2 rounded-lg transition-colors"
            >
              <Mail className="h-4 w-4 ml-3" />
              <span>تیکت ها</span>
            </Link>
            <Link
              href="/user-panel/send-ticket"
              className="flex items-center text-gray-400 hover:bg-[#363B4D] hover:text-white px-3 py-2 rounded-lg transition-colors"
            >
              <SendIcon className="h-4 w-4 ml-3" />
              <span>ارسال تیکت</span>
            </Link>
            <a
              href="#"
              className="flex items-center text-gray-400 hover:bg-[#363B4D] hover:text-white px-3 py-2 rounded-lg transition-colors"
            >
              <Volume2 className="h-4 w-4 ml-3" />
              <span>اعلانات</span>
            </a>
            <a
              href="#"
              className="flex items-center text-gray-400 hover:bg-[#363B4D] hover:text-white px-3 py-2 rounded-lg transition-colors"
            >
              <Settings2 className="h-4 w-4 ml-3" />
              <span>تنظیمات</span>
            </a>
          </nav>
        </div>

        <div className="p-6">
          <button className="flex items-center !text-red-600 hover:!text-white hover:!bg-red-700 w-full !text-center !py-2 !bg-[#363B4D] px-3 py-2 rounded-lg transition-colors" onClick={UserLogoutHandler}>
            <p className="!mx-auto flex gap-1">
              خروج از حساب
              <LogOut />
            </p>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main
        className={`pt-14 transition-all duration-300 ${isSidebarOpen ? 'md:mr-64' : 'mr-0 md:mr-64'
          }`}
      >
        <div>{children}</div>
      </main>
    </div>
  );
}
