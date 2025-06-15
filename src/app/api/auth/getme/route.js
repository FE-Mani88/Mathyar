import connectToDB from "../../../../../configs/connectToDB";
import { authUser } from "@/utils/serverheplers";

export async function GET() {
    await connectToDB()

    try {
        const user = await authUser()

        if (!user) {
            return Response.json({ message: 'User is not authorized !' }, { status: 401 })
        }

        return Response.json(user, { status: 200 })
    } catch (error) {
        return Response.json({ message: 'Unknow server error :(' }, { status: 500 })
    }
}