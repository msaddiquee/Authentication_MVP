import express, { type Express, type Request, type Response } from "express";
import { Product } from "../model/Product.js"
import mongoose from "mongoose";
import "dotenv/config";

const PORT = process.env.PORT;
const uri = process.env.MONGO_URI;

if(!uri){
    throw new Error("No URI found in env.");
}
await mongoose.connect(uri);

const server: Express = express();
server.use(express.json());


server.get("/", (req: Request, res: Response) => {
    res.write("Root page");
    res.send();
});

server.get("/products", async(req: Request, res: Response) => {
    try{
        const products = await Product.find();
        res.status(200).send(products);
    }
    catch (err) {
        res.status(400).json({ message: "Failed to GET product", error: (err as Error).message });
    }
});

server.post("/product", async(req: Request, res: Response) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).send(product);
    }
    catch (err) {
        res.status(400).json({ message: "Failed to POST product", error: (err as Error).message });
    }
});

server.delete("/product/:id", async(req: Request, res: Response) => {
    try{
        await Product.deleteOne( {_id: req.params.id} );
        res.status(200).send("Deleted Successfully");
    }
    catch (err) {
        res.status(400).json({ message: "Failed to DELETE product", error: (err as Error).message });
    }
});

server.put("/product/:id", async(req: Request, res: Response) => {
    try{
        const { name, description } = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, { $set: { name, description } },
          { new: true, runValidators: true });
        res.status(200).send(product);
    }
    catch (err) {
        res.status(400).json({ message: "Failed to PUT product", error: (err as Error).message });
    }
});
server.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));