import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponse } from '../interface/common';
import { IGenericErrorMessage } from '../interface/error';
import httpStatus from 'http-status';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
    const errors: IGenericErrorMessage[] = error.issues.map(
        (issue: ZodIssue) => ({
            path: issue?.path[issue.path.length - 1],
            message: issue.message,
        }),
    );

    const statusCode = httpStatus.BAD_REQUEST;

    return {
        statusCode,
        message: 'Validation error',
        errorMessages: errors,
    };
};

export default handleZodError;
