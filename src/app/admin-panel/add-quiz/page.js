"use client";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout/AdminPanelLayout";
import { useState } from "react";
import Swal from "sweetalert2";

export default function AddQuizForm() {
    const [formData, setFormData] = useState({
        title: "",
        id: "",
        description: "",
        imageUrl: "",
        grade: "",
        duration: "",
        difficulty: "",
        topics: [""],
    });

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleTopicChange = (index, value) => {
        const newTopics = [...formData.topics]; // آرایه کپی میشه
        newTopics[index] = value; // مقدار جدید جایگزین میشه
        setFormData({ ...formData, topics: newTopics }); // فرم آپدیت میشه
    };

    const addTopic = () => {
        setFormData({ ...formData, topics: [...formData.topics, ""] });
    };

    const removeTopic = (index) => {
        const newTopics = formData.topics.filter((_, i) => i !== index);
        setFormData({ ...formData, topics: newTopics });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/quizzes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if (res.ok) {
            Swal.fire({
                icon: 'success',
                title: 'کوییز با موفقیت اضافه شد :)'
            })
        }

        console.log(res)

    };

    return (
        <AdminPanelLayout>
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-6 mt-8">
                <h2 className="!text-xl !font-bold text-blue-700">افزودن آزمون جدید</h2>

                <div>
                    <label className="block text-sm !font-medium !my-1.5">عنوان آزمون</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        placeholder="مثلاً: الگو و اعداد صحیح هفتم"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm !font-medium !my-1.5">آیدی آزمون</label>
                    <input
                        type="text"
                        value={formData.id}
                        onChange={(e) => handleChange("id", e.target.value)}
                        placeholder="مثلا: seventh-easy-quiz"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">توضیحات آزمون</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        placeholder="توضیحاتی درباره‌ی محتوای آزمون..."
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">لینک تصویر آزمون</label>
                    <input
                        type="text"
                        value={formData.imageUrl}
                        onChange={(e) => handleChange("imageUrl", e.target.value)}
                        placeholder="https://example.com/image.png"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">پایه تحصیلی</label>
                        <input
                            type="number"
                            value={formData.grade}
                            onChange={(e) => handleChange("grade", e.target.value)}
                            placeholder="مثلاً: 7"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">مدت زمان (دقیقه)</label>
                        <input
                            type="number"
                            value={formData.duration}
                            onChange={(e) => handleChange("duration", e.target.value)}
                            placeholder="مثلاً: 15"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">درجه سختی</label>
                    <select
                        value={formData.difficulty}
                        onChange={(e) => handleChange("difficulty", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">انتخاب کنید...</option>
                        <option value="easy">آسان</option>
                        <option value="medium">متوسط</option>
                        <option value="hard">سخت</option>
                    </select>
                </div>

                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">تاپیک‌ها</label>
                    {formData.topics.map((topic, index) => (
                        <div key={index} className="flex items-center">
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => handleTopicChange(index, e.target.value)}
                                placeholder={`تاپیک ${index + 1}`}
                                className="flex-1 border px-3 py-2 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                            />
                            {formData.topics.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeTopic(index)}
                                    className="!bg-red-600 hover:text-red-800 text-sm !text-white w-max !py-2 !px-2 rounded-l-lg"
                                >
                                    حذف
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addTopic}
                        className="!text-blue-600 hover:underline text-sm"
                    >
                        + افزودن تاپیک جدید
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 !text-white !py-2 rounded-lg transition"
                >
                    ثبت آزمون
                </button>
            </form>
        </AdminPanelLayout>
    );
}
