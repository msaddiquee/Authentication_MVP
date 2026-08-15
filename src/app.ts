import express, { type Express, type Request, type Response } from "express";
import "dotenv/config";
import router from "./routes/productRoutes.js";
import "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

export const PORT = process.env.PORT;
export const app: Express = express();

app.use(express.json());
app.use(router);

app.use(notFound);
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
    res.write("Root page");
    res.send();
});

