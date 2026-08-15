import type { Request, Response } from "express";

const notFound = (req: Request , res: Response) => {
    res.status(404).json({
        message: `Not Found - ${req.originalUrl}`
    });
}

const errorHandler = (err: Error, req: Request, res: Response) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ 
        message: err.message || "An unknown error occurred",
        stack: process.env.NODE_ENV === "production"? null : err.stack,
    })
}

export {
    notFound,
    errorHandler,
}