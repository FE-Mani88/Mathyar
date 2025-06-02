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


export default function AdminPanelLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState([])

  useEffect(() => {
    const getUser = async () => {
      const userRes = await fetch('/api/user')
      const userData = await userRes.json()

      setUser(userData)
    }

    getUser()
  }, [])

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
              <span className="hidden sm:block">{user?.username}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}

      {/* Top Sidebar Items */}
      <div className={`fixed flex flex-col justify-between right-0 top-14 w-64 h-[calc(100vh-3.5rem)] bg-[#2C2F3B] text-white transform transition-transform duration-300 z-50 ${isSidebarOpen ? 'translate-x-0' : '!translate-x-full md:!translate-x-0 md:translate-x-0'
        }`}>
        <div className="p-6">
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">سازمان‌ها</div>
          <div className="mb-8 text-sm font-medium">برنامه‌نویسان حماسی</div>
          <nav className="space-y-1">
            <a href="#" className="flex items-center text-blue-400 hover:bg-[#363B4D] px-3 py-2 rounded-lg transition-colors">
              <Grid className="h-4 w-4 ml-3" />
              <span>یکپارچه‌سازی‌ها</span>
            </a>
            <a href="#" className="flex items-center text-gray-400 hover:bg-[#363B4D] hover:text-white px-3 py-2 rounded-lg transition-colors">
              <CreditCard className="h-4 w-4 ml-3" />
              <span>حقوق و دستمزد</span>
            </a>
            <a href="#" className="flex items-center text-gray-400 hover:bg-[#363B4D] hover:text-white px-3 py-2 rounded-lg transition-colors">
              <Users2 className="h-4 w-4 ml-3" />
              <span>اعضا</span>
            </a>
            <a href="#" className="flex items-center text-gray-400 hover:bg-[#363B4D] hover:text-white px-3 py-2 rounded-lg transition-colors">
              <FolderGit2 className="h-4 w-4 ml-3" />
              <span>پروژه‌ها</span>
            </a>
            <a href="#" className="flex items-center text-gray-400 hover:bg-[#363B4D] hover:text-white px-3 py-2 rounded-lg transition-colors">
              <CreditCard className="h-4 w-4 ml-3" />
              <span>طرح‌ها و صورتحساب</span>
            </a>
            <a href="#" className="flex items-center text-gray-400 hover:bg-[#363B4D] hover:text-white px-3 py-2 rounded-lg transition-colors">
              <Settings2 className="h-4 w-4 ml-3" />
              <span>تنظیمات</span>
            </a>
          </nav>
        </div>

        {/* Buttom Sidebar Items */}
        <div className="p-6">
          <button className="flex items-center !text-red-600 hover:!text-white hover:!bg-red-700 text-blue-400 w-full !text-center !py-2 !bg-[#363B4D] px-3 py-2 rounded-lg transition-colors">
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