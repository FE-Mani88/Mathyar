import React from 'react';

export function QuizQuestion({ question, selectedAnswer, onAnswerSelect }) {
  return (
    <>
      <div className="bg-white dark:bg-[#222c40] p-6 rounded-lg shadow-md mt-4">

        <h3 className="!text-xl font-medium !mb-4 dark:text-white rtl">{question?.question}</h3>
        <div className="!space-y-3">
          {question?.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswerSelect(option)}
              className={`rtl w-full dark:hover:!bg-gray-700 dark:!bg-gray-600 dark:!text-gray-200 !p-4 text-left rounded-lg transition-colors text-black ${selectedAnswer === option
                ? '!bg-blue-200 border-2 border-blue-500 dark:bg-[#293546] dark:text-white '
                : '!bg-gray-100 hover:!bg-gray-200 dark:bg-[#3e4a5c] dark:text-white '
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}