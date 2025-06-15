'use client'
import React, { useState, useEffect } from 'react';
import { QuizProgress } from '../QuizProgress/QuizProgress';
import { QuizQuestion } from '../QuizQuestion/QuizQuestion';
import { QuizResults } from '../QuizResults/QuizResults';

export function ActiveQuiz({ objectID, id, questions, duration, title }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isFinished) {
      finishQuiz(answers);
    }
  }, [timeLeft, isFinished]);

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      finishQuiz(newAnswers);
    }
  };

  const calculateScore = (finalAnswers) => {
    return finalAnswers.reduce((score, answer, index) => {
      return answer === questions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };

  const finishQuiz = async (finalAnswers = answers) => {
    setIsFinished(true);

    const correctAnswersNumber = calculateScore(finalAnswers);
    const correctAnswersPercentage = (correctAnswersNumber / questions.length) * 100;

    try {
      const res = await fetch('/api/quizzesResults', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quiz: objectID,
          correctAnswersPercentage,
          correctAnswersNumber,
        }),
      });

      if (!res.ok) {
        console.error('Failed to save result');
      }
    } catch (error) {
      console.error('Error sending result:', error);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setTimeLeft(duration * 60);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <QuizResults
        score={calculateScore(answers)} // استفاده از answers فعلی
        totalQuestions={questions.length}
        answers={answers}
        questions={questions}
        quizTitle={title}
        onRetry={handleRetry}
        quizId={id}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 dark:bg-[#121a29] transition-all">
      <div className="max-w-3xl mx-auto">
        <QuizProgress
          currentQuestion={currentQuestion + 1}
          totalQuestions={questions.length}
          timeLeft={timeLeft}
        />

        <QuizQuestion
          question={questions[currentQuestion]}
          selectedAnswer={answers[currentQuestion]}
          onAnswerSelect={handleAnswerSelect}
        />
      </div>
    </div>
  );
}
