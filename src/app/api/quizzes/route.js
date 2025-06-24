import connectToDB from "../../../../configs/connectToDB";
import quizModel from "../../../../models/Quizzes";

export const GET = async () => {
    await connectToDB()

    try {
        const quizzes = await quizModel.find({}).populate('questions')

        return Response.json(quizzes, { status: 200 })
    } catch (error) {
        return Response.json({ message: 'Unknown server error :(', error: error }, { status: 500 })
    }

}

export const POST = async (req) => {
    const requestBody = await req.json()

    const {id, title, imageUrl, description, grade, duration, topics, difficulty } = requestBody

    await quizModel.create({
        id, title, imageUrl, description, grade, duration, topics, difficulty
    })

    return Response.json({ message: 'Quiz Added Successfully :)' }, { status: 201 })
}