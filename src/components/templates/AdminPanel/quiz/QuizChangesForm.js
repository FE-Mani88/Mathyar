'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

export default function QuizChangesForm({ quiz }) {

    const router = useRouter()

    const [formData, setFormData] = useState({
        title: quiz.title || '',
        duration: quiz.duration || 0,
        imageUrl: quiz.imageUrl || '',
        description: quiz.description || '',
        grade: quiz.grade || 0,
        difficulty: quiz.difficulty || 'easy',
        topics: quiz.topics || [],
    });

    const [imageError, setImageError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'duration' || name === 'grade' ? Number(value) : value,
        }));

        if (name === 'imageUrl') {
            setImageError(false);
        }
    };

    const handleTopicChange = (index, value) => {
        const newTopics = [...formData.topics];
        newTopics[index] = value;
        setFormData((prev) => ({ ...prev, topics: newTopics }));
    };

    const addTopic = () => {
        setFormData((prev) => ({
            ...prev,
            topics: [...prev.topics, ''],
        }));
    };

    const removeTopic = (index) => {
        const newTopics = [...formData.topics];
        newTopics.splice(index, 1);
        setFormData((prev) => ({ ...prev, topics: newTopics }));
    };

    const removeQuizHandler = async (event) => {
        event.preventDefault()
        Swal.fire({
            icon: 'question',
            title: 'آیا از حذف آزمون اطمینان دارید؟',
            showConfirmButton: false,
            showDenyButton: true,
            showCancelButton: true,
            cancelButtonText: 'خیر',
            denyButtonText: 'بله',
        }).then(async (result) => {
            if (result.isDenied) {
                const res = await fetch(`/api/quizzes/${quiz._id}`, {
                    method: 'DELETE'
                })

                if (res.ok) {
                    return Swal.fire({
                        icon: 'success',
                        title: 'آزمون با موفقیت حذف شد',
                        confirmButtonText: 'فهمیدم'
                    }).then(() => {
                        router.replace('/admin-panel/quizzes')
                    })
                }

                return Swal.fire({
                    icon: 'error',
                    title: 'خطایی در فرآیند حذف آزمون به وجود آمد',
                    confirmButtonText: 'فهمیدم'
                })
            } else {
                return Swal.fire({
                    icon: 'info',
                    title: 'تغییرات ذخیره نشدند',
                    confirmButtonText: 'متوجه شدم'
                })
            }
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/quizzes/${quiz._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                return Swal.fire({
                    title: 'مشکلی در ذخیره سازی به وجود اومد !',
                    icon: 'error',
                    confirmButtonText: 'فهمیدم'
                })
            }
            return Swal.fire({
                title: 'تغییرات با موفقیت ذخیره شدند',
                icon: 'success',
                confirmButtonText: 'فهمیدم'
            })
        } catch (err) {
            return Swal.fire({
                title: 'مشکلی در ذخیره سازی به وجود اومد !',
                icon: 'error',
                confirmButtonText: 'فهمیدم'
            })
        }
    };

    return (
        <form
            className="bg-indigo-100 p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6"
        >
            {/* عنوان آزمون */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">عنوان آزمون</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            {/* مدت زمان */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">مدت زمان (دقیقه)</label>
                <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            {/* عکس آزمون */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">لینک تصویر</label>
                <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                {!imageError && formData.imageUrl && (
                    <img
                        src={formData.imageUrl}
                        alt="پیش‌نمایش عکس آزمون"
                        className="mt-4 mx-auto min-w-[350px] max-h-50 max-w-sm rounded-lg border"
                        onError={() => setImageError(true)}
                    />
                )}
                {imageError && (
                    <p className="text-red-600 text-sm !mt-2 flex items-center gap-x-1">
                        <InformationCircleIcon className="w-5 h-5" />
                        لینک عکس نامعتبر است یا لود نمی‌شود.
                    </p>
                )}
            </div>

            {/* توضیحات آزمون */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            {/* پایه تحصیلی */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">پایه</label>
                <input
                    type="number"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            {/* سختی */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">درجه سختی</label>
                <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="easy">آسان</option>
                    <option value="medium">متوسط</option>
                    <option value="hard">سخت</option>
                </select>
            </div>

            {/* موضوعات */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">موضوعات</label>
                {formData.topics.map((topic, index) => (
                    <div key={index} className="flex items-center gap-x-2 mb-2">
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => handleTopicChange(index, e.target.value)}
                            placeholder={`موضوع ${index + 1}`}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <button
                            type="button"
                            onClick={() => removeTopic(index)}
                            className="!text-red-600 hover:!underline transition-all text-sm"
                        >
                            حذف
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addTopic}
                    className="mt-2 !px-3 !py-1 text-sm bg-indigo-500 !text-white rounded hover:bg-indigo-600 transition"
                >
                    افزودن موضوع جدید
                </button>
            </div>

            {/* دکمه ذخیره */}
            <div className="md:col-span-2 !space-y-2">
                <button
                    onClick={removeQuizHandler}
                    className="w-full bg-red-500 !text-white !py-2 !px-4 rounded-md hover:bg-red-600 transition"
                >
                    حذف آزمون
                </button>
                <button
                    onClick={handleSubmit}
                    className="w-full bg-indigo-600 !text-white !py-2 !px-4 rounded-md hover:bg-indigo-700 transition"
                >
                    ذخیره تغییرات
                </button>
            </div>
        </form>
    );
}
