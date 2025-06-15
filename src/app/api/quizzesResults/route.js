import quizResultModel from "../../../../models/QuizResults";
import { authUser } from "@/utils/serverheplers";

export async function GET() {
    const user = await authUser()

    if (!user) {
        return Response.json({ message: 'User Is Not Authourized' }, { status: 401 })
    }

    const quizzesResults = await quizResultModel.find({}).populate('user quiz')
    return Response.json(quizzesResults)
}


export async function POST(req) {
    const user = await authUser()
    const requestBody = await req.json()

    const { correctAnswersPercentage, correctAnswersNumber, quiz } = requestBody

    try {
        await quizResultModel.create({
            correctAnswersNumber,
            correctAnswersPercentage,
            quiz,
            user
        })

        return Response.json({ message: 'Quiz Result Saved Successfully :)' }, { status: 201 })
    } catch (error) {
        console.log('Catch Error => ', error)
        return Response.json({ message: 'Unknown Server Error' }, { status: 500 })
    }
}