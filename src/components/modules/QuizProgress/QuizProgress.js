import React from 'react';

export function QuizProgress({ currentQuestion, totalQuestions, timeLeft }) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          سوال {currentQuestion} از {totalQuestions}
        </span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          زمان باقیمانده: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}