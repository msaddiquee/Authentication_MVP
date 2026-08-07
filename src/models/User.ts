import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true, trim: true, lowercase: true, required: true},
    password: {type: String, trim: true, lowercase: true, required: true} 
}, {versionKey: false});

export const User = mongoose.model("User", userSchema);
