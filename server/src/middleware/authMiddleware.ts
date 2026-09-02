import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";

const protect = asyncHandler(async(req: Request, res: Response, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from the user
            token = req.headers.authorization.split(" ")[1];

            if(!token){
                res.status(401);
                throw new Error("Not authorized, no token");
            }
            // Verify token
            const jwt_secret = process.env.JWT_SECRET || "abc123";

            const decoded = jwt.verify(token, jwt_secret);

            // Get user from the token
            if (typeof decoded === "string" || !("id" in decoded)) {
                res.status(401);
                throw new Error("Not authorized, invalid token");
            }

            req.user = await User.findById(decoded.id).select("-password");
            
            next();
        } catch (err) {
            console.log(err);
            res.status(401);
            throw new Error("Not authorized", { cause: err });
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }

    
})

export {
    protect,
}