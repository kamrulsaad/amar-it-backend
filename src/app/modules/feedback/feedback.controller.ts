import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FeedbackService } from './feedback.service';
import { JwtPayload } from 'jsonwebtoken';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const { username } = req.user as JwtPayload;
    const result = await FeedbackService.insertIntoDB(payload, username);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Feedback created successfully!',
        data: result,
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await FeedbackService.getAllFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Feedback fetched successfully!',
        data: result,
    });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await FeedbackService.updateIntoDB(id, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Feedback updated successfully',
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await FeedbackService.deleteFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Feedback deleted successfully',
        data: result,
    });
});

const getSingleFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await FeedbackService.getSingleFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Feedback fetched successfully',
        data: result,
    });
});

export const FeedbacController = {
    insertIntoDB,
    getAllFromDB,
    updateIntoDB,
    deleteFromDB,
    getSingleFromDB,
};
