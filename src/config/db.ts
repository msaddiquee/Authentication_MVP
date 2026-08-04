import mongoose from "mongoose";
import "dotenv/config";

const uri = process.env.MONGO_URI;

if(!uri){
    throw new Error("No URI found in env.");
}

export const connectdb = async () => {
    try {
        await mongoose.connect(uri);
    }
    catch(error){
        // Comment: Rethrow database connection errors to prevent the application from starting in a failed state
        console.error("Database connection failed:", error);
        throw error;
    }
}