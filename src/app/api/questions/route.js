import connectToDB from "../../../../configs/connectToDB";
import questionModel from "../../../../models/Questions";
import quizModel from "../../../../models/Quizzes";

export const POST = async (req) => {

    await connectToDB()

    const requestBody = await req.json()

    const { question, options, correctAnswer, quiz } = requestBody

    const newQuestion = await questionModel.create({
        question,
        options,
        correctAnswer,
        quiz
    })

    const mainQuiz = await quizModel.findOneAndUpdate({ _id: requestBody.quiz }, {
        $push: {
            questions: newQuestion._id
        }
    })

    return Response.json({ message: 'Question Added Successfully :)' }, { status: 201 })
}