import React from 'react'
import connectToDB from '../../../../configs/connectToDB'
import quizModel from '../../../../models/Quizzes'
import QuizDetails from '@/components/templates/QuizDetails/QuizDetails'
import Header from '@/components/modules/Navbar/Navbar'
import { authUser } from '@/utils/serverheplers'

export default async function page({ params }) {

    await connectToDB()

    const mainQuiz = await quizModel.findOne({ id: params.quizId }).populate('questions').lean()
    
    return (
        <>
            <QuizDetails objectID={mainQuiz._id} id={JSON.parse(JSON.stringify(mainQuiz.id))} imageUrl={JSON.parse(JSON.stringify(mainQuiz.imageUrl))} title={JSON.parse(JSON.stringify(mainQuiz.title))} description={JSON.parse(JSON.stringify(mainQuiz.description))} difficulty={JSON.parse(JSON.stringify(mainQuiz.difficulty))} grade={JSON.parse(JSON.stringify(mainQuiz.grade))} questions={JSON.parse(JSON.stringify(mainQuiz.questions))} duration={JSON.parse(JSON.stringify(mainQuiz.duration))} topics={JSON.parse(JSON.stringify(mainQuiz.topics))} />
        </>
    )
}

export const metadata = {
    title: 'Mathyar | Quiz Details',
    icons: {
        icon: '/images/fav.png'
    }
}
