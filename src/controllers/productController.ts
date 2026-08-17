import { Product } from "../models/productModel.js";
import type { Request, Response } from "express";

// @route   POST /api/users/
// @desc    get all products
// access   Private
export const getAllProducts = async(req: Request, res: Response) => {
    try{
        const products = await Product.find();
        res.status(200).send(products);
    }
    catch (err) {
        res.status(400).json({ message: "Failed to GET product", error: (err as Error).message });
    }
};

// @route   POST /api/users/
// @desc    create a product
// access   Private
export const createProduct = async(req: Request, res: Response) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).send(product);
    }
    catch (err) {
        res.status(400).json({ message: "Failed to POST product", error: (err as Error).message });
    }
};

// @route   DELETE /api/users/:id
// @desc    delete a product
// access   Private
export const deleteProduct = async(req: Request, res: Response) => {
    try{
        await Product.deleteOne( {_id: req.params.id} );
        res.status(200).send("Deleted Successfully");
    }
    catch (err) {
        res.status(400).json({ message: "Failed to DELETE product", error: (err as Error).message });
    }
};

// @route   PUT /api/users/:id
// @desc    update a product
// access   Private
export const updateProduct = async(req: Request, res: Response) => {
    try{
        const { name, description } = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, { $set: { name, description } }, { returnDocument: 'after', runValidators: true });
        res.status(200).send(product);
    }
    catch (err) {
        res.status(400).json({ message: "Failed to PUT product", error: (err as Error).message });
    }
};