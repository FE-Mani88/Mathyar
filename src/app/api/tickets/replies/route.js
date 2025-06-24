// import ticketModel from "@/models/Tickets";
import ticketModel from "../../../../../models/Tickets";
// import { connectToDB } from "@/configs/connectToDB";
import connectToDB from "../../../../../configs/connectToDB";
import { authUser } from "@/utils/serverheplers";

export async function POST(req) {
  await connectToDB();
  const user = await authUser();
  if (!user) return Response.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { ticketId, message } = body;

  if (!ticketId || !message) {
    return Response.json({ message: "Invalid data" }, { status: 400 });
  }

  const ticket = await ticketModel.findById(ticketId);
  if (!ticket) return Response.json({ message: "Ticket not found" }, { status: 404 });

  ticket.replies.push({
    userId: user._id,
    message: message,
    createdAt: new Date()
  });

  await ticket.save();

  return Response.json({ message: "Reply added successfully" });
}
