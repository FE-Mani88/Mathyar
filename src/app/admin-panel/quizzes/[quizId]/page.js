import React from 'react'
import AdminPanelLayout from '@/components/layouts/AdminPanelLayout/AdminPanelLayout'
import quizModel from '../../../../../models/Quizzes'
import QuizChangesForm from '@/components/templates/AdminPanel/quiz/QuizChangesForm'

export default async function page({ params }) {

  const quiz = await quizModel.findOne({ _id: params.quizId })

  return (
    <AdminPanelLayout>
      <QuizChangesForm quiz={JSON.parse(JSON.stringify(quiz))} />
    </AdminPanelLayout>
  )
}
