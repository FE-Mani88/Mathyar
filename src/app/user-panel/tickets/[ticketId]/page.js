import React from "react";
import { authUser } from "@/utils/serverheplers";
import ticketModel from "../../../../../models/Tickets";
import UserPanelLayout from "@/components/layouts/UserPanelLayout/UserPanelLayout";
import SweetAlertModal from "@/components/modules/SweetAlertModal/SweetAlertModal";
import TicketContent from "@/components/modules/TicketChatForm";
import TicketDetails from "@/components/templates/UserPanel/TicketDetails";

export default async function TicketDetailPage({ params }) {
  const user = await authUser();

  if (!user) {
    return <SweetAlertModal title='زمان ورود شما منقضی شده است' icon='error' confirmButtonText='بازگشت به ورود' redirectURL='/login' />
  }

  const ticket = await ticketModel.findById(params.ticketId).populate("replies.userId");

  if (!ticket || ticket.userId.toString() !== user._id.toString()) {
    return <UserPanelLayout>دسترسی غیرمجاز</UserPanelLayout>;
  }

  return (
    <UserPanelLayout>
      <TicketDetails ticket={JSON.parse(JSON.stringify(ticket))} user={JSON.parse(JSON.stringify(user))} />
    </UserPanelLayout>
  );
}
