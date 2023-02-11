import { NextFunction, Request, Response } from "express";
import { HandleError } from "../exceptions/ErrorHandler";

export default function HandlerError(error: Error & Partial<HandleError>, req: Request, res: Response, next: NextFunction) {
    const statusCode = error.statusCode ?? 500;
    const message = error.statusCode ? error.message : "Internal Server Error";
    return res.status(statusCode).json({ message });
}