'use client'
import React, { useState, useEffect } from 'react';
import { QuizProgress } from '../QuizProgress/QuizProgress';
import { QuizQuestion } from '../QuizQuestion/QuizQuestion';
import { QuizResults } from '../QuizResults/QuizResults';

export function ActiveQuiz({ id, questions, duration, title }) {
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
      finishQuiz();
    }
  }, [timeLeft, isFinished]);

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setIsFinished(true);
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return answer === questions[index].correctAnswer ? score + 1 : score;
    }, 0);
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
        score={calculateScore()}
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
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-4 dark:bg-[#121a29] transition-all mt-8">
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
      {/* <Footer /> */}
    </>
  );
}