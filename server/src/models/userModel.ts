import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Please add a name"], },
    email: { type: String, required: [true, "Please add an email"], unique: true },
    password: { type: String, required: [true, "Please add a password"], },
    verified: { type: String, required: true, default: false },
}, { versionKey: false, timestamps: true });

export const User = mongoose.model("User", userSchema);