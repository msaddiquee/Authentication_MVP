import { User } from "../models/User.js";
import type { Request, Response } from "express";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

export const registerUser = asyncHandler(async(req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists){
        res.status(400);
        throw new Error("User already exists");
    }
    const user = await User.create({
        name: name,
        email: email,
        password: password,
    });

    if (user){
        const token = generateToken(user._id.toString());

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    }
});

export const loginUser = asyncHandler(async(req: Request, res: Response) => {
    const { email, password } : {email: string, password: string}= req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id.toString());

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    }
});