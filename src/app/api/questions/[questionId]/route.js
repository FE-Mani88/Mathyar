import { NextResponse } from "next/server";
import questionModel from "../../../../../models/Questions";
import connectToDB from "../../../../../configs/connectToDB";

export async function DELETE(req, { params }) {

    await connectToDB()

    try {
        const deletedQuestion = await questionModel.findOneAndDelete({
            _id: params.questionId
        })

        return new NextResponse(deletedQuestion, { status: 200 })
    } catch (error) {
        return new NextResponse({ error: error.message }, { status: 500 })
    }
}