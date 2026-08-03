import express, { type Express, type Request, type Response } from "express";
import "dotenv/config";

const PORT = process.env.PORT;
const server = express();

server.get("/", (req, res) => {
    res.write("Root page");
    res.send();
})

server.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));