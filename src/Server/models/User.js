import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true,
    },
    password: {
        type: String,
        required:true,
    },
    about: {
        type: String,
        required: true,
    },
    Task: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    ]
});

export const User = mongoose.model("users", UserSchema);