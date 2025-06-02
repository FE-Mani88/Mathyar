import mongoose from "mongoose";
require('./Quizzes')

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [],
        required: true
    },
    correctAnswer: {
        type: 'String',
        required: true
    },
    quiz: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Quiz'
    }
})

const questionModel = mongoose.models.Question || mongoose.model('Question', questionSchema)

export default questionModel