import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { adminFilterableFields } from './admin.constant';
import { paginationFields } from '../../../constant/pagination';
import { pick } from '../../../shared/utils';
import { AdminService } from './admin.service';
import sendResponse from '../../../shared/sendResponse';
import { Admin } from '@prisma/client';
import httpStatus from 'http-status';
import { IUploadFile } from '../../../interface/file';

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, adminFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await AdminService.getAllFromDB(filters, paginationOptions);

    sendResponse<Admin[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admins retrieved successfully !',
        meta: result.meta,
        data: result.data,
    });
});

const getSingleFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await AdminService.getSingleFromDB(id);

    sendResponse<Admin>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin retrieved successfully !',
        data: result,
    });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const file = req.file as IUploadFile;

    const result = await AdminService.updateOneInDB(id, req.body, file);

    sendResponse<Admin>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin updated successfully !',
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await AdminService.deleteFromDB(id);

    sendResponse<Admin>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin deleted successfully !',
        data: result,
    });
});

export const AdminController = {
    getAllFromDB,
    getSingleFromDB,
    deleteFromDB,
    updateOneInDB,
};
