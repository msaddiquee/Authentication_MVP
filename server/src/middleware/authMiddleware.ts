import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
// import { User } from "../models/userModel.js";
import type { JwtPayload } from "jsonwebtoken";

const protect = asyncHandler(async(req: Request, res: Response, next) => {
    const token = req.cookies.token;
    if (!token){
        res.status(401);
        throw new Error("Not authorized, no token");
    }

    const jwt_secret = process.env.JWT_SECRET;
    if (!jwt_secret) {
        res.status(404);
        throw new Error("No jwt secret found");
    }

    jwt.verify(token, jwt_secret, (err: Error | null, decoded: JwtPayload | string | undefined) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized access' });
        }
        req.user = decoded;
        next();
    });
})

export {
    protect,
}