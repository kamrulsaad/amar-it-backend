import { Package } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PackageService } from './package.service';
import { pick } from '../../../shared/utils';
import { packageFilterableFields } from './package.constant';
import { paginationFields } from '../../../constant/pagination';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const result = await PackageService.insertIntoDB(data);
    sendResponse<Package>(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Package created successfully',
        data: result,
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, packageFilterableFields);
    const options = pick(req.query, paginationFields);
    const result = await PackageService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Packages fetched successfully',
        meta: result.meta,
        data: result.data,
    });
});

const getOneFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await PackageService.getSingleFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Package fetched successfully',
        data: result,
    });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const result = await PackageService.updateSingleInDB(id, data);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Package updated successfully',
        data: result,
    });
});

const deleteOneFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await PackageService.deleteOneFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Package deleted successfully',
        data: result,
    });
});

export const PackageController = {
    insertIntoDB,
    getAllFromDB,
    getOneFromDB,
    updateOneInDB,
    deleteOneFromDB,
};
