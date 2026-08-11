import jwt from "jsonwebtoken";
import "dotenv/config";

const jwt_secret = process.env.JWT_SECRET;

export default generatToken() {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}