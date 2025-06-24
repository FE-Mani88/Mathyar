import React from 'react'
import AdminPanelLayout from '@/components/layouts/AdminPanelLayout/AdminPanelLayout'
import questionModel from '../../../../models/Questions'
import Questions from '@/components/templates/AdminPanel/questions/Questions'

export default async function page() {

    const questions = await questionModel.find({}).populate('quiz')

    return (
        <AdminPanelLayout>
            <Questions questions={JSON.parse(JSON.stringify(questions))} />
        </AdminPanelLayout>
    )
}
