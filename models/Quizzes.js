import mongoose from "mongoose";
require('./Questions')

const quizSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    topics: {
        type: [String],
        required: true,
    },
    difficulty: {
        type: String,
        required: true
    },
    questions: {
        type: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Question",
            },
        ],
        default: []
    }
})

const quizModel = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema)

export default quizModel