import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";

// @route   POST /api/users/
// @desc    register a user
// access   Public
const registerUser = asyncHandler(async(req: Request, res: Response) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password){
        res.status(400);
        throw new Error("Please add all fields");
    }

    const userExist = await User.findOne({ email });
    if (userExist){
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user){
        res.status(201).json({ 
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid Credential");
    }
});

// @route   POST /api/users/login
// @desc    Authenticate a user
// access   Public
const loginUser = asyncHandler(async(req: Request, res: Response) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({ 
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    }

    else {
        res.status(400);
        throw new Error("Invalid Credential");
    }
});

// @route   GET /api/users/me
// @desc    GET user data
// access   Private
const getMe = asyncHandler(async(req: Request, res: Response) => {
    res.json({ message: "User data" });
});


const jwt_secret = process.env.JWT_SECRET || "abc123";

const generateToken = (id) => {
    return jwt.sign({ id }, jwt_secret, {
        expiresIn: "30d",
    })
}
export {
    registerUser,
    loginUser,
    getMe,
}