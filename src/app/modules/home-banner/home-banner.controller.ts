import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { HomeBannerService } from './home-banner.service';
import { IUploadFile } from '../../../interface/file';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const file = req.file as IUploadFile;
    const result = await HomeBannerService.insertIntoDB(payload, file);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Home Banner created successfully!',
        data: result,
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await HomeBannerService.getAllFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Home Banner fetched successfully!',
        data: result,
    });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await HomeBannerService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Home Banner fetched successfully!',
        data: result,
    });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const file = req.file as IUploadFile;
    const result = await HomeBannerService.updateIntoDB(id, file, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Home Banner updated successfully',
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await HomeBannerService.deleteFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Home Banner deleted successfully',
        data: result,
    });
});

export const HomeBannerController = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
};
