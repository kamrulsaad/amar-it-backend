/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from '@prisma/client';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import ApiError from '../../errors/ApiError';
import handleClientError from '../../errors/handleClientError';
import handleValidationError from '../../errors/handleValidationError';
import handleZodError from '../../errors/handleZodError';
import { IGenericErrorMessage } from '../../interface/error';
import { errorLogger } from '../../shared/logger';

const globalErrorHandler: ErrorRequestHandler = (
    error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    errorLogger.error(`🐱‍🏍 globalErrorHandler ~~`, error);

    let statusCode = 500;
    let message = 'Something went wrong !';
    let errorMessages: IGenericErrorMessage[] = [];

    if (error instanceof Prisma.PrismaClientValidationError) {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const simplifiedError = handleClientError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (error?.code === 11000) {
        statusCode = 400;
        message = 'Duplicate value error';
        errorMessages = [
            {
                path: '',
                message: 'Duplicate value error',
            },
        ];
    } else if (error?.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
        errorMessages = [
            {
                path: '',
                message: 'Invalid token',
            },
        ];
    } else if (error?.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'jwt expired';
        errorMessages = [
            {
                path: '',
                message: 'jwt expired',
            },
        ];
    } else if (error?.name === 'MongoError') {
        statusCode = 500;
        message = 'Mongo error';
        errorMessages = [
            {
                path: '',
                message: 'Mongo error',
            },
        ];
    } else if (error?.code === 401) {
        statusCode = 401;
        message = 'Unauthorized';
        errorMessages = [
            {
                path: '',
                message: 'Unauthorized',
            },
        ];
    } else if (error instanceof ApiError) {
        statusCode = error?.statusCode;
        message = error.message;
        errorMessages = error?.message
            ? [
                  {
                      path: '',
                      message: error?.message,
                  },
              ]
            : [];
    } else if (error instanceof Error) {
        message = error?.message;
        errorMessages = error?.message
            ? [
                  {
                      path: '',
                      message: error?.message,
                  },
              ]
            : [];
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: error?.stack,
    });
};

export default globalErrorHandler;
