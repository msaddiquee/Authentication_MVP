import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: [ true, "Please add a name" ] },
    description: { type: String, required: [ true, "Please add a description" ] },
}, {versionKey: false});

export const Product = mongoose.model("samplecollection", ProductSchema);