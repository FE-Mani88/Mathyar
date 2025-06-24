import React from "react";
import Link from "next/link";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout/AdminPanelLayout";
import ticketModel from "../../../../models/Tickets";
import { Trash2 } from "lucide-react";

export default async function page() {
  const tickets = await ticketModel.find({}).populate("userId");
  const openTickets = await ticketModel.find({ status: "open" });
  const closedTickets = await ticketModel.find({ status: "closed" });
  const withoutAnswerTickets = await ticketModel.find({ replies: { $exists: true, $size: 0 } });

  const stats = [
    { title: "تعداد تیکت ها", count: tickets.length },
    { title: "تیکت های باز", count: openTickets.length },
    { title: "تیکت های بسته شده", count: closedTickets.length },
    { title: "تیکت های بدون پاسخ", count: withoutAnswerTickets.length },
  ];

  return (
    <AdminPanelLayout>
      <div className="mx-auto max-w-5xl mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 rounded-lg bg-indigo-300 py-4 px-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded p-4 shadow">
            <div className="text-sm text-gray-500">{stat.title}</div>
            <div className="text-2xl font-bold">{stat.count}</div>
            <div className="text-xs text-gray-400">Mathyar</div>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-5xl overflow-x-auto ltr">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-white">
              <th className="text-right py-3 px-4 w-1/5">عملیات</th>
              <th className="text-right py-3 px-4 w-1/5">نقش</th>
              <th className="text-right py-3 px-4 w-1/5">تاریخ ارسال</th>
              <th className="text-right py-3 px-4 w-1/5">شماره تلفن فرستنده</th>
              <th className="text-right py-3 px-4 w-1/5">موضوع تیکت</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr
                key={index}
                className="bg-[#f1f5ff] border-b border-gray-200 hover:bg-indigo-100 transition"
              >
                <td className="py-3 px-4 text-right flex gap-4 justify-end items-center">
                  <button className="!text-white transition flex !bg-red-600 hover:!bg-red-700 !px-1.5 !py-[2px] rounded-lg">
                    <Trash2 className="w-5 h-5" />
                    <p>حذف تیکت</p>
                  </button>
                </td>

                <td className="py-3 px-4 text-right">کاربر</td>

                <td className="py-3 px-4 text-right truncate">
                  <Link href={`/admin-panel/tickets/${ticket._id}`} className="text-indigo-600 hover:underline">
                    {new Date(ticket.createdAt).toLocaleDateString("fa-IR")}
                  </Link>
                </td>

                <td className="py-3 px-4 text-right">
                  <Link href={`/admin-panel/tickets/${ticket._id}`} className="text-indigo-600 hover:underline">
                    {ticket.userId?.phoneNumber || "نامشخص"}
                  </Link>
                </td>

                <td className="py-3 px-4 text-right">
                  <Link href={`/admin-panel/tickets/${ticket._id}`} className="text-indigo-600 hover:underline">
                    {ticket.subject}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminPanelLayout>
  );
}
