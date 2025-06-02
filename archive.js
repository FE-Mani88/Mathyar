<div className="max-w-5xl mx-auto">
  <div className="mb-8">
    <h1 className="text-2xl font-semibold mb-4">برنامه‌نویسان حماسی</h1>
    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">فعال</span>
      </div>
      <div>ارز: دلار</div>
      <div>منطقه زمانی: آمریکا - نیویورک</div>
      <div>طرح: تیم ۱۰ نفره (حرفه‌ای) ماهانه</div>
    </div>
  </div>

  <div className="bg-white rounded-lg shadow-sm">
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="text-sm text-gray-600 mb-4 md:mb-0">
          ۴ یکپارچه‌سازی فعال برای این سازمان
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          افزودن یکپارچه‌سازی
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-right py-3 px-4">نام</th>
              <th className="text-right py-3 px-4">نوع</th>
              <th className="text-right py-3 px-4">آخرین همگام‌سازی</th>
              <th className="text-right py-3 px-4">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.name} className="border-b last:border-0">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2 justify-end">
                    <span>{user.name}</span>
                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                      {typeof user.icon === "string" ? user.icon : user.icon}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">{user.type}</td>
                <td className="py-3 px-4 text-right">{user.lastSync}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2 justify-end">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <RefreshCcw className="h-4 w-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Archive className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>