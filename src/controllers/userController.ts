import { User } from "../models/User.js";
import type { Request, Response } from "express";

export const registerUser = async(req: Request, res: Response) => {
    try{
        const user = await User.create(req.body);
        res.status(200).send(user);
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
}