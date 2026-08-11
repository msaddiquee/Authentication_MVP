import { User } from "../models/User.js";
import type { Request, Response } from "express";
import generateToken from "../utils/generateToken.js";

export const registerUser = async(req: Request, res: Response) => {
    try{
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
            const token = generateToken(user._id);

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token,
            });
        }
    }
    catch (err) {
        res.status(400).json({ message: "Failed to GET product", error: (err as Error).message });
    }
}

export const loginUser = async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
    }
    catch (err) {
        res.status(500).json({ message: "Login failed", error: (err as Error).message });
    }
};