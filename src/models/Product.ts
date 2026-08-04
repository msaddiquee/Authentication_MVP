import mongoose from "mongoose";

type Product = {
    name: string,
    description: string
}
const ProductSchema = new mongoose.Schema({
     name: String,
    description: String,
}, {versionKey: false});

export const Product = mongoose.model("samplecollection", ProductSchema);