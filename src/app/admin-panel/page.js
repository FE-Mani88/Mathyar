import React from 'react'
import AdminPanelLayout from '@/components/layouts/AdminPanelLayout/AdminPanelLayout'
import userModel from '../../../models/Users'
import MainTemplate from '@/components/templates/AdminPanel/MainTemplate'
import { authUser } from '@/utils/serverheplers'
import SweetAlertModal from '@/components/modules/SweetAlertModal/SweetAlertModal'

export default async function page() {
    const user = await authUser()

    if (!user) {
        return <SweetAlertModal title='!زمان ورود شما منقضی شده است' icon='info' confirmButtonText='بازگشت به ورود' redirectURL='login' />
    } else if (user.role !== 'ADMIN') {
        return <SweetAlertModal title='شما اجازه دسترسی به این صفحه را ندارید' icon='error' confirmButtonText='بازگشت به پنل کاربری' redirectURL='user-panel' />
    }

    const users = await userModel.find({}).sort({ _id: -1 }).limit(3)

    return (
        <AdminPanelLayout>
            <MainTemplate users={JSON.parse(JSON.stringify(users))} />
        </AdminPanelLayout>
    )
}
