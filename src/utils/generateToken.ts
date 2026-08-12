import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}
const generatToken = (userId: string) :string => {
    return jwt.sign({ id: userId }, JWT_SECRET, {
        expiresIn: '30d',
    });
}

export default generatToken;