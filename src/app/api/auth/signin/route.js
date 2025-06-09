import connectToDB from "../../../../../configs/connectToDB";
import userModel from "../../../../../models/Users";
import { verifyPassword, generateToken } from "@/utils/auth";

export async function POST(req) {
    await connectToDB()

    const requestBody = await req.json()

    try {
        const mainUser = await userModel.findOne({
            phoneNumber: requestBody.phoneNumber
        })

        if (!mainUser) {
            return Response.json({ message: 'There is not any user with this details!' }, { status: 404 })
        }

        const isPasswordCorrect = await verifyPassword(requestBody.password, mainUser.password)

        if (!isPasswordCorrect) {
            return Response.json({ message: 'User Password Is Not Correct' }, { status: 400 })
        }

        const token = await generateToken({
            username: mainUser.username,
            email: mainUser.email,
            phoneNumber: mainUser.phoneNumber,
        })

        return Response.json({
            message: 'User Logged in Successfully :)',
            role: mainUser.role
        }, { status: 201, headers: { "Set-Cookie": `token=${token};path=/;httpOnly=true;max-age=360000` } })

    } catch (error) {
        console.log('Error => ', error)
        return Response.json({ message: 'Unknown Server Error' }, { status: 500 })
    }
}