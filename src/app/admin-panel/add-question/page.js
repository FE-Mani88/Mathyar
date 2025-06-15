"use client";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout/AdminPanelLayout";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function AddQuestionForm() {

    const [quizzes, setQuizzes] = useState([])

    const [formData, setFormData] = useState({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        quiz: "", // می‌تونی از props هم بگیری
    });

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...formData.options];
        newOptions[index] = value;
        handleChange("options", newOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("سؤال ثبت شد:", formData);
        // اینجا می‌تونی API ارسال کنی
    };

    useEffect(() => {
        const fetchQuizzes = async () => {
            const res = await fetch("/api/quizzes"); // فرض: این API لیست آزمون‌ها رو می‌ده
            const data = await res.json();
            setQuizzes(data); // [{ _id: "...", title: "الگو و اعداد صحیح" }, ...]
        };
        fetchQuizzes();
    }, []);

    const submitQuestionHandler = async () => {
        const res = await fetch("/api/questions", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if (res.ok) {
            Swal.fire({
                icon: 'success',
                title: ':) سوال با موفقیت اضافه شد',
                confirmButtonText: 'عالیه'
            })
        }
    }

    return (
        <AdminPanelLayout>
            <form onSubmit={handleSubmit} className="mt-4 bg-white p-6 rounded-xl shadow space-y-6 max-w-3xl mx-auto">
                <h2 className="text-xl font-bold text-blue-700">افزودن سؤال جدید</h2>

                <div>
                    <label className="block text-sm font-medium mb-1">متن سؤال</label>
                    <textarea
                        value={formData.question}
                        onChange={(e) => handleChange("question", e.target.value)}
                        placeholder="مثلاً: عدد بعدی در دنباله‌ی زیر کدام است؟"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">گزینه‌ها</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formData.options.map((option, idx) => (
                            <input
                                key={idx}
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(idx, e.target.value)}
                                placeholder={`گزینه ${idx + 1}`}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">پاسخ صحیح</label>
                    <input
                        type="text"
                        value={formData.correctAnswer}
                        onChange={(e) => handleChange("correctAnswer", e.target.value)}
                        placeholder="مثلاً: 63"
                        className="w-full border border-green-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">انتخاب آزمون</label>
                    <select
                        value={formData.quiz}
                        onChange={(e) => handleChange("quiz", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">یک آزمون انتخاب کنید</option>
                        {quizzes.map((quiz) => (
                            <option key={quiz._id} value={quiz._id}>
                                {quiz.title}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={submitQuestionHandler}
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 !text-white !py-2 rounded-lg transition"
                >
                    ثبت سؤال
                </button>
            </form>
        </AdminPanelLayout>
    );
}
