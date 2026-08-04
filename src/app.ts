import express, { type Express, type Request, type Response } from "express";
import "dotenv/config";
import { router } from "./routes/routes.js";


export const PORT = process.env.PORT;
export const app: Express = express();
// Comment: Register express.json body parser before routes to ensure req.body is parsed
app.use(express.json());
app.use(router);


app.get("/", (req: Request, res: Response) => {
    res.write("Root page");
    res.send();
});

