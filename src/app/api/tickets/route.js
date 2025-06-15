import ticketModel from "../../../../models/Tickets";
import connectToDB from "../../../../configs/connectToDB";
import { authUser } from "@/utils/serverheplers";

export async function POST(req) {
  await connectToDB();

  const user = await authUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { subject, body } = body;

  if (!subject || !message) {
    return new Response("Invalid data", { status: 400 });
  }

  const ticket = await ticketModel.create({
    userId: user._id,
    subject,
    body,
  });

  return Response.json(ticket);
}
