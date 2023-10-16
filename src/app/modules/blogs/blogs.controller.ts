import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constant/pagination';
import { IUploadFile } from '../../../interface/file';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { pick } from '../../../shared/utils';
import { blogsFilterableFields } from './blogs.constant';
import { BlogService } from './blogs.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const file = req.file as IUploadFile;
    const result = await BlogService.insertIntoDB(payload, file);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog created successfully!',
        data: result,
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, blogsFilterableFields);
    const options = pick(req.query, paginationFields);
    const result = await BlogService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blogs fetched successfully',
        meta: result.meta,
        data: result.data,
    });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BlogService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog  fetched successfully!',
        data: result,
    });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const file = req.file as IUploadFile;
    const result = await BlogService.updateIntoDB(id, file, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog  updated successfully',
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BlogService.deleteFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog deleted successfully',
        data: result,
    });
});

export const BlogController = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
};
