import { cookies } from "next/headers";

export async function GET() {
    try {
        (await cookies()).delete('token')
        return Response.json({ message: 'User Signed Out Successfully :)' }, { status: 200 })
    } catch (error) {
        console.log('Error => ', error)
        return Response.json({ message: 'Unexpected Server Error :(' }, { status: 500 })
    }

}