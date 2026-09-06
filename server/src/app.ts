import express, { type Express, type Request, type Response } from "express";
import "dotenv/config";
import "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

export const PORT = process.env.PORT;
export const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
    res.write("Root page");
    res.send();
});

