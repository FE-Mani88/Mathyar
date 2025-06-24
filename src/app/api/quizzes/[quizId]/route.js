import { NextResponse } from 'next/server';
import connectToDB from '../../../../../configs/connectToDB';
import quizModel from '../../../../../models/Quizzes';

export async function PUT(request, contextPromise) {
    const context = await contextPromise;
    const { quizId } = context.params;

    await connectToDB();

    // return new Response(quizId, {status: 200})
    const body = await request.json();

    try {
        const updatedQuiz = await quizModel.findByIdAndUpdate(quizId, body, {
            new: true,
            runValidators: true,
        });

        if (!updatedQuiz) {
            return NextResponse.json({ error: 'آزمون پیدا نشد.' }, { status: 404 });
        }

        return NextResponse.json(updatedQuiz);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function DELETE(request, contextPromise) {
    const context = await contextPromise;
    const { quizId } = context.params;

    await connectToDB()

    try {
        const deletedQuiz = await quizModel.findOneAndDelete({
            _id: quizId
        })

        return NextResponse.json(deletedQuiz, { status: 200 })
    } catch (error) {
        console.log('Api Error =>', error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}