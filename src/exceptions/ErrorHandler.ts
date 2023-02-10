import { Response } from "express";

export enum HttpCode {
    OK = 200,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    UNPROCESSABLE_ENTITY = 422
}

export class HandleError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }

}

export class BadRequestError extends HandleError {
    constructor(message: string) {
        super(message, HttpCode.BAD_REQUEST);
    }
}

export class UnprocessableEntityError extends HandleError {
    constructor(message: string) {
        super(message, HttpCode.UNPROCESSABLE_ENTITY);
    }
}

export class NotFoundError extends HandleError {
    constructor(message: string) {
        super(message, HttpCode.NOT_FOUND);
    }
}