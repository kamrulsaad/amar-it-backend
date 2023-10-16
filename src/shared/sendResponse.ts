import { Response } from 'express';

type IApiResponse<T> = {
    success: boolean;
    statusCode: number;
    message?: string | null;
    data?: T | null;
    meta?: {
        total?: number;
        page?: number;
        limit?: number;
    };
};

const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
    const responseData = {
        success: data.success,
        statusCode: data.statusCode,
        message: data.message || null,
        meta: data.meta || null || undefined,
        data: data.data || null || undefined,
    };

    res.status(data.statusCode).json(responseData);
};

export default sendResponse;
