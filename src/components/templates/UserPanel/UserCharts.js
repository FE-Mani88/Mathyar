'use client'
import React from 'react';
import {
    LineChart, Line, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer,
} from 'recharts';

export default function UserCharts({ data }) {
    if (!data || data.length === 0) {
        return (
            <div className="text-center mt-6 text-gray-500">
                هیچ داده‌ای برای نمایش نمودار وجود ندارد.
            </div>
        );
    }

    console.log('DECIPLINE: ', data)

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 px-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg mb-4 text-gray-800">نمودار خطی پیشرفت درسی</h3>
                <ResponsiveContainer className='!mt-2' width="100%" height={200}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#624bff" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
                <p className="text-indigo-500 text-sm mt-2">میانگین درصد درست در هر ماه</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg mb-4 text-gray-800">نمودار میله‌ای پیشرفت درسی</h3>
                <ResponsiveContainer className='!mt-2' width="100%" height={200}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip />
                        <Bar dataKey="value" fill="rgba(21, 90, 250, 0.2)" stroke='#624bff' />
                    </BarChart>
                </ResponsiveContainer>
                <p className="text-indigo-500 text-sm mt-2">میانگین درصد درست در هر ماه</p>
            </div>
        </div>
    );
}
