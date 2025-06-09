import { generateToken, hashPasswordHandler } from "@/utils/auth"
import userModel from "../../../../../models/Users"
import connectToDB from "../../../../../configs/connectToDB"

export async function POST(req) {
    const reqBody = await req.json()

    await connectToDB()

    if (reqBody.username.trim().length < 4 || reqBody.email.trim().length < 10 || reqBody.phoneNumber.trim().length < 8 || reqBody.password.trim().length < 8) {
        return Response.json({ message: 'Sent data is not valid :(' }, { status: 400 })
    }

    const isUserExist = await userModel.findOne({
        $or: [{ email: reqBody.email }, { phoneNumber: reqBody.phoneNumber }],
    });

    if (isUserExist) {
        return Response.json({ message: 'This user was registered before' }, { status: 422 })
    }

    try {
        const hashedPassword = hashPasswordHandler(reqBody.password)

        const token = await generateToken({
            username: reqBody.username,
            email: reqBody.email,
            phoneNumber: reqBody.phoneNumber,
            role: 'USER'
        })

        await userModel.create({
            username: reqBody.username,
            email: reqBody.email,
            phoneNumber: reqBody.phoneNumber,
            password: hashedPassword
        })

        return Response.json({
            message: 'User Created Successfully :)',
        }, { status: 201, headers: { "Set-Cookie": `token=${token};path=/;httpOnly=true;max-age=360000` } })

    } catch (error) {
        console.log(error)
        return Response.json({ message: 'Unexpected Server Error :(' }, { status: 500 })
    }

}