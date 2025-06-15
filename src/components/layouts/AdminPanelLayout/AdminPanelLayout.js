"use client";
import { useEffect, useState } from "react";
import {
  Github,
  RefreshCcw,
  Trash2,
  Archive,
  Menu,
  Bell,
  Settings,
  Users,
  CreditCard,
  Grid,
  Users2,
  FolderGit2,
  Settings2,
  LogOut,
} from "lucide-react";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function AdminPanelLayout({ children }) {

  const router = useRouter()
  const pathname = usePathname()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const getUser = async () => {
      const userRes = await fetch('/api/auth/getme')
      const userData = await userRes.json()

      if (userRes.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'زمان ورود شما منقضی شده است',
          confirmButtonText: 'فهمیدم'
        })

        router.replace('/login')

        return null;
      } else if (userRes.ok) {
        setUser(userData)
      }
    }

    getUser()
  }, [])

  const AdminLogoutHandler = async () => {
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

  if (user === undefined) {
    <div className={`loading-container bg-[#1a2331] h-[100vh] flex justify-center items-center ${true ? 'loading' : ''}`}>
      <div className="loader"></div>
    </div>
  } else if (user.role !== 'ADMIN') {
    Swal.fire({
      icon: 'error',
      title: 'شما اجازه دسترسی به این صفحه را ندارید',
      confirmButtonText: 'فهمیدم'
    }).then(() => {
      return router.replace('/user-panel')
    })

  } else {
    return (
      <div dir="rtl" className="min-h-screen bg-[#E6EDFF]">
        {/* Overlay for mobile */}
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
              <span className="text-blue-600 font-bold text-xl hidden sm:block">Mathyar | داشبورد ادمین</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Users className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  {user.username?.trim()[0].toUpperCase()}
                </div>
                <span className="hidden sm:block">
                  {user.username ? user.username : (
                    <div className="w-20 h-3 bg-gray-300 animate-pulse"></div>
                  )}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Sidebar */}

        {/* Top Sidebar Items */}
        <div className={`fixed flex flex-col justify-between right-0 top-14 w-64 h-[calc(100vh-3.5rem)] bg-[#2C2F3B] text-white transform transition-transform duration-300 z-50 ${isSidebarOpen ? 'translate-x-0' : '!translate-x-full md:!translate-x-0 md:translate-x-0'
          }`}>
          <div className="p-6">
            <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">پنل ادمین</div>
            <div className="mb-8 text-sm font-medium">خوش آمدید {user.username ? user.username : '...'} عزیز</div>
            <nav className="space-y-1">
              <Link href="/admin-panel" className={`flex items-center text-blue-400 hover:bg-[#363B4D] px-3 py-2 rounded-lg transition-colors ${pathname === '/admin-panel' ? '!text-blue-400 bg-[#363B4D]' : ''}`}>
                <Grid className="h-4 w-4 ml-3" />
                <span>داشبورد</span>
              </Link>
              <Link href="/admin-panel/add-quiz" className={`flex items-center text-gray-400 hover:bg-[#363B4D] hover:text-white px-3 py-2 rounded-lg transition-colors ${pathname === '/admin-panel/add-quiz' ? '!text-blue-400 bg-[#363B4D]' : ''}`}>
                <CreditCard className="h-4 w-4 ml-3" />
                <span>افزودن آزمون</span>
              </Link>
              <Link href="/admin-panel/add-question" className={`flex items-center text-gray-400 hover:bg-[#363B4D] hover:text-white px-3 py-2 rounded-lg transition-colors ${pathname === '/admin-panel/add-question' ? '!text-blue-400 bg-[#363B4D]' : ''}`}>
                <FolderGit2 className="h-4 w-4 ml-3" />
                <span>افزودن سوال</span>
              </Link>
              <Link href="/admin-panel/members" className={`flex items-center text-gray-400 hover:bg-[#363B4D] hover:text-white px-3 py-2 rounded-lg transition-colors ${pathname === '/admin-panel/members' ? '!text-blue-400 bg-[#363B4D]' : ''}`}>
                <Users2 className="h-4 w-4 ml-3" />
                <span>اعضا</span>
              </Link>
              <a href="#" className="flex items-center text-gray-400 hover:bg-[#363B4D] hover:text-white px-3 py-2 rounded-lg transition-colors">
                <CreditCard className="h-4 w-4 ml-3" />
                <span>تیکت ها</span>
              </a>
              <a href="#" className="flex items-center text-gray-400 hover:bg-[#363B4D] hover:text-white px-3 py-2 rounded-lg transition-colors">
                <Settings2 className="h-4 w-4 ml-3" />
                <span>تنظیمات</span>
              </a>
            </nav>
          </div>

          {/* Buttom Sidebar Items */}
          <div className="p-6">
            <button onClick={AdminLogoutHandler} className="flex items-center !text-red-600 hover:!text-white hover:!bg-red-700 text-blue-400 w-full !text-center !py-2 !bg-[#363B4D] px-3 py-2 rounded-lg transition-colors">
              <p className="!mx-auto flex gap-1">
                خروج از حساب
                <LogOut />
              </p>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className={`pt-14 transition-all duration-300 ${isSidebarOpen ? 'md:mr-64' : 'mr-0 md:mr-64'} p-8`}>
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    );

  }
}