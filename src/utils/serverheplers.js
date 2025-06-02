import connectToDB from "../../configs/connectToDB";
import { cookies } from "next/headers";
import userModel from "../../models/Users";
import { verifyToken } from "./auth";

export const authUser = async () => {
    await connectToDB();
    const token = cookies().get("token");

    let user = null;

    if (token) {
        const tokenPayload = await verifyToken(token.value);

        if (tokenPayload) {
            user = await userModel.findOne({ phoneNumber: tokenPayload.phoneNumber });
        }

        console.log('Token: ', tokenPayload)
    }

    return user;
};