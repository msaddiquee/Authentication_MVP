import mongoose from "mongoose";
import "dotenv/config";

const uri = process.env.MONGO_URI;

if(!uri){
    throw new Error("No URI found in env.");
}

export const connectdb = async () => {
    try {
        console.log("Connecting DB...");
        await mongoose.connect(uri);
    }
    catch(error){
        console.error("Database connection failed:", error);
        throw error;
    }
    finally{
        console.log("DB connected Successfully..");
    }
}