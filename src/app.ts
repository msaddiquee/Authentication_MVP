import express, { type Express, type Request, type Response } from "express";
import "dotenv/config";
import { Router } from "express";


export const PORT = process.env.PORT;
export const app: Express = express();
export const router = Router();

app.use(express.json());
app.use(router);

app.get("/", (req: Request, res: Response) => {
    res.write("Root page");
    res.send();
});

