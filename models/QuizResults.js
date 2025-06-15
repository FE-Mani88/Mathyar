import mongoose from "mongoose";
import userModel from "./Users";
import quizModel from "./Quizzes";

const quizResultSchema = new mongoose.Schema({
    correctAnswersPercentage: {
        type: Number,
        required: true
    },
    correctAnswersNumber: {
        type: Number,
        required: true
    },
    quiz: {
        type: mongoose.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

const quizResultModel = mongoose.models.QuizResult || mongoose.model('QuizResult', quizResultSchema)

export default quizResultModel