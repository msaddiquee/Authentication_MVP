import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";

const registerUser = asyncHandler(async(req: Request, res: Response) => {

});

const loginUser = asyncHandler(async(req: Request, res: Response) => {
    
});

export {
    registerUser,
    loginUser,
}