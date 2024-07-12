import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default:Date.now,
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
    },
});

export const Task = mongoose.model("Task", TaskSchema);
