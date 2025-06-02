import React from 'react'
import connectToDB from '../../../../configs/connectToDB'
import quizModel from '../../../../models/Quizzes'
import QuizDetails from '@/components/templates/QuizDetails/QuizDetails'

export default async function page({ params }) {

    await connectToDB()

    const mainQuiz = await quizModel.findOne({ id: params.quizId }).populate('questions').lean()
    return (
        <>
            <QuizDetails id={mainQuiz.id} imageUrl={mainQuiz.imageUrl} title={mainQuiz.title} description={mainQuiz.description} difficulty={mainQuiz.difficulty} grade={mainQuiz.grade} questions={mainQuiz.questions} duration={mainQuiz.duration} topics={mainQuiz.topics} />
        </>
    )
}

export const metadata = {
    title: 'Mathyar | Quiz Details',
    icons: {
        icon: '/images/fav.png'
    }
}
