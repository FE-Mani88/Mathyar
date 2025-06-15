import React from 'react'
import AdminPanelLayout from '@/components/layouts/AdminPanelLayout/AdminPanelLayout'
import userModel from '../../../../models/Users'
import AllUsers from '@/components/templates/AdminPanel/AllUsers'

export default async function page() {

    const users = await userModel.find({ role: 'USER' })

    return (
        <AdminPanelLayout>
            <AllUsers users={JSON.parse(JSON.stringify(users))} />
        </AdminPanelLayout>
    )
}
