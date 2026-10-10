import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { User } from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

const nodeEnv = process.env.NODE_ENV;
if (!nodeEnv) {
    throw new Error("No node environment found");
}

// @route   POST /api/users/register/
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


    // Generate verification token (expires in 24 hours)
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        verified: false,
        verificationToken,
        verificationTokenExpires,
    });
    
    if (user){
        // Construct verification URL pointing directly to the backend
        const verificationUrl = `http://localhost:${process.env.PORT || 3000}/api/users/verify-email?token=${verificationToken}`;

        // Send verification email
        try {
            await sendVerificationEmail(user.email, verificationUrl);
        } catch (err: any) {
            console.error("❌ Failed to send verification email:", err);
        }

        res.status(201).json({ 
            _id: user.id,
            name: user.name,
            email: user.email,
            verified: user.verified,
            message: "Registration successful. Please check your email to verify your account.",
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
        if (!user.verified) {
            res.status(403);
            throw new Error("Please verify your email before logging in");
        }

        const token = generateToken(user._id);

        res.cookie('token', token, {
            httpOnly: true, 
            secure: nodeEnv === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ 
            _id: user.id,
            name: user.name,
            email: user.email,
        });
    }

    else {
        res.status(400);
        throw new Error("Invalid Username or Password");
    }
});

// @route   POST /api/users/logout
// @desc    logout user
// access   Private
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    res.cookie("token", "", {
        httpOnly: true, 
        secure: nodeEnv === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
});

// @route   GET /api/users/me
// @desc    GET user data
// access   Private
const getMe = asyncHandler(async(req: Request, res: Response) => {
    const user = await User.findById( req.user.id );

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
    })
});

// @route   DELETE /api/users/me
// @desc    delete user
// access   Private
const deleteUser = asyncHandler(async(req: Request, res: Response) => {
    await User.findByIdAndDelete( req.user.id );
    res.status(204).send();
});

// @route   POST /api/users/changepassword
// @desc    change login user password
// access   Private
const changePassword = asyncHandler(async(req: Request, res: Response) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    if (!currentPassword || !newPassword || !confirmNewPassword) {
        res.status(404);
        throw new Error("Invalid Credentails");
    }

    const user = await User.findById( req.user.id );
    if (!user || !user.password) {
        res.status(404);
        throw new Error("User not found");
    }

    if (!(await bcrypt.compare(currentPassword, user.password)) ) {
        res.status(400);
        throw new Error("Current Password is incorrect");
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    res.status(200).json("Password Changed Successfully");
});

// @route   GET /api/users/verify-email
// @desc    Verify user email via token query param
// @access  Public
const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.query;

    if (!token || typeof(token) !== "string") {
        res.status(400);
        throw new Error("Verification token is required");
    }

    const user = await User.findOne({
        verificationToken: token,
        verificationTokenExpires: { $gt: new Date() },
    });

    if (!user) {
        res.status(400);
        throw new Error("Invalid or expired verification token");
    }

    user.verified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;
    await user.save();

    // If opened directly in browser, show a clean confirmation page
    if (req.accepts("html")) {
        return res.send(`
            <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 80px;">
                <h1 style="color: #28a745;">✅ Email Verified Successfully!</h1>
                <p style="font-size: 18px; color: #555;">Your account is now activated. You can now log in via Postman.</p>
            </div>
        `);
    }

    res.status(200).json({
        success: true,
        message: "Email verified successfully! You can now log in.",
    });
});

export {
    registerUser,
    loginUser,
    logoutUser,
    getMe,
    deleteUser,
    changePassword,
    verifyEmail,
}