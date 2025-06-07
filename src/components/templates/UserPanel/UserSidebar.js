import React from 'react'

export default function UserSidebar() {
  return (
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
  )
}
