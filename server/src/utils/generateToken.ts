import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateToken = (id: Types.ObjectId | string) => {
    const jwt_secret = process.env.JWT_SECRET || "abc123";
    if (!jwt_secret) {
        throw new Error("JWT secret not found");
    }

    return jwt.sign({ id }, jwt_secret, {
        expiresIn: "30d",
    })
}
