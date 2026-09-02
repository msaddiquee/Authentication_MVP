// src/types/express.d.ts
import { User } from "../models/userModel.ts"; // adjust to your actual user type

declare global {
  namespace Express {
    interface Request {
      user?: User | null;
    }
  }
}

export {}; // required so this file is treated as a module