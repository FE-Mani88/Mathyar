import React from 'react'
import AdminPanelLayout from '@/components/layouts/AdminPanelLayout/AdminPanelLayout'
import ticketModel from '../../../../../models/Tickets'
import TicketContent from '@/components/modules/TicketChatForm';
import { authUser } from '@/utils/serverheplers';
import TicketDetails from '@/components/templates/AdminPanel/TicketDetails';

export default async function page({ params }) {
    const user = await authUser()
    const ticket = await ticketModel.findById(params.ticketId).populate("replies.userId userId");

    return (
        <AdminPanelLayout>
            <TicketDetails ticket={JSON.parse(JSON.stringify(ticket))} user={JSON.parse(JSON.stringify(user))} />
        </AdminPanelLayout>
    )
}
