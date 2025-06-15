import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        subject: { type: String, required: true },
        body: { type: String, required: true },
        status: {
            type: String,
            enum: ["open", "in_progress", "closed"],
            default: "open",
        },
        replies: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                message: String,
                createdAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

const ticketModel = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default ticketModel;