import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";
import userModel from "../../../../../models/Users";

export async function GET(req, { params }) {
    const configCookies = await cookies()

    const token = configCookies.get('token')

    if (!token) {
        return Response.json({ message: 'There is not any token in user cookies' }, { status: 401 })
    }

    const tokenPayload = await verifyToken(token.value)

    if (!tokenPayload) {
        return Response.json({ message: 'User token is not valid' }, { status: 401 })
    }

    const mainUser = await userModel.findOne({ phoneNumber: tokenPayload.phoneNumber })

    return Response.json(mainUser)
}