import React from 'react'
import Navbar from '@/components/modules/Navbar/Navbar'
import Footer from '@/components/templates/Index/Footer/Footer';
import { Users, Target, Heart, BookOpenCheck, Lightbulb, Compass, Book, MessageSquare, Shield, Ellipsis, CircleEllipsis } from 'lucide-react';
import { authUser } from '@/utils/serverheplers';

export default async function page() {

  const user = await authUser()

  return (
    <>
      <Navbar isUserRegistered={JSON.parse(JSON.stringify(user)) ? true : false} user={JSON.parse(JSON.stringify(user))} />
      <div className="min-h-screen bg-gray-900">
        <div
          className="relative h-[400px] bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://www.um.edu.mt/media/um/images/faculties/science/maths/mathsresearch340x227.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white px-4" data-aos='fade-up'>
              <h1 className="!text-6xl !font-bold !mb-4 !bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">درباره ما</h1>
              <p className="!text-xl max-w-2xl !mx-auto !text-gray-300">
                راهنمای استفاده از اپلیکیشن + تیم سازنده و اهداف وبسایت
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="!text-3xl !font-bold !mb-6 !text-white" data-aos='zoom-out' >مأموریت ما</h2>
            <p className="text-lg text-gray-400 max-w-3xl !mx-auto">
              توانمندسازی کسب‌وکارها و افراد از طریق راه‌حل‌های فناوری پیشرفته که موجب رشد،
              تقویت نوآوری و ایجاد تأثیر مثبت پایدار در جوامع ما می‌شود.
            </p>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: <BookOpenCheck className="w-8 h-8" />,
                title: "کیفیت سوالات",
                description: "سعی کردیم که سوالات رو با بیشترین دقت و کیفیت طرح کنیم"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "امنیت",
                description: "پروتکل هایی رو برای حفظ حریم خصوصی کاربرامون پیاده سازی کردیم"
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "اشتیاق",
                description: "با اشتیاق به دنبال اضافه کردن قابلیت های جدید به این اپلیکیشن هستیم"
              },
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: "نوآوری",
                description: "اپلیکیشنی متفاوت از سایر وبسایت های کوییز محور توسعه دادیم"
              }
            ].map((value, index) => (
              <div key={index} data-aos='fade-up' className="!bg-gray-800 p-6 rounded-xl text-center hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 border border-gray-700">
                <div className="inline-block p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white mb-4">
                  {value.icon}
                </div>
                <h3 className="!text-xl !font-semibold !mb-2 !text-white">{value.title}</h3>
                <p className="!text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>

          {/* Team Section */}
          <div className="text-center mb-12">
            <h2 className="!text-3xl !font-bold !mb-16 !text-white" data-aos='fade-up' >تیم ما</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3jhpAFYpzxx39DRuXIYxNPXc0zI5F6IiMQ&s",
                  name: "ایلیا عباسی",
                  role: "طراح سوالات"
                },
                {
                  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3jhpAFYpzxx39DRuXIYxNPXc0zI5F6IiMQ&s",
                  name: "مانی خاکسار",
                  role: "برنامه نویس"
                },
                {
                  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3jhpAFYpzxx39DRuXIYxNPXc0zI5F6IiMQ&s",
                  name: "جواد انصاری فر",
                  role: "ادیتور"
                }
              ].map((member, index) => (
                <div key={index} className="text-center group" data-aos='fade-up'>
                  <div className="relative mb-4 mx-auto w-48 h-48 overflow-hidden rounded-full border-4 border-gray-700 group-hover:border-blue-500 transition-all duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="!text-xl !font-semibold !text-white">{member.name}</h3>
                  <p className="!text-gray-400">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Guide Section */}
          <div className="min-h-screen flex items-center justify-center py-16">
            <div className="w-full">
              <h2 className="!text-4xl !font-bold !text-center !mb-16 !text-white" data-aos='zoom-out' >
                راهنمای استفاده از پلتفرم ما
              </h2>
              <div className="grid lg:grid-cols-3 gap-12 rtl">
                {[
                  {
                    icon: <Compass className="w-12 h-12" />,
                    title: "شروع کار",
                    description: "برای شروع از استفاده از وبسایت، ابتدا در سایت ثبت نام کنید و پس از تکمیل اطلاعات، میتونین در آزمون ها شرکت کنین",
                    steps: [
                      "ایجاد حساب کاربری",
                      "تکمیل پروفایل",
                      "شرکت در اولین آزمون"
                    ]
                  },
                  {
                    icon: <MessageSquare className="w-12 h-12" />,
                    title: "پشتیبانی",
                    description: "در صورت بروز هر گونه مشکل میتونین از واحد پشتیبانی به ما تیکت بدین تا برای رفع اون اقدام کنیم",
                    steps: [
                      "ورود به صفحه تیکت ها",
                      "نوشتن موضوع و متن تیکت و شرح مشکل",
                      "ارسال تیکت"
                    ]
                  },
                  {
                    icon: <CircleEllipsis className="w-12 h-12" />,
                    title: "سایر صفحات",
                    description: "علاوه بر آپشن هایی که قبلا بهشون اشاره کردیم، به زودی آپشن های آموزشی جدیدی هم به سایت اضافه میشه :)",
                    steps: [
                      "صفحه علاقه مندی ها",
                      "صفحه ویدیو های تحلیل سوالات هر آزمون",
                      "تماس با تیم پشتیبانی"
                    ]
                  }
                ].map((guide, index) => (
                  <div
                    data-aos='fade-up'
                    key={index}
                    className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="text-blue-400 mb-6">
                      {guide.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">
                      {guide.title}
                    </h3>
                    <p className="text-gray-400 mb-6">
                      {guide.description}
                    </p>
                    <ul className="space-y-3 !mt-2">
                      {guide.steps.map((step, stepIndex) => (
                        <li
                          key={stepIndex}
                          className="flex items-center text-gray-300"
                        >
                          <span className="w-6 h-6 flex items-center justify-center bg-blue-500/20 text-blue-400 rounded-full ml-3 text-sm">
                            {stepIndex + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}


export const metadata = {
  title: 'Mathyar | About Us',
  icons: {
    icon: '/images/fav.png'
  }
}