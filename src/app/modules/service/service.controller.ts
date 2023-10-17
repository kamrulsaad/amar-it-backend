import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ServiceService } from './service.service';
import sendResponse from '../../../shared/sendResponse';
import { Service } from '@prisma/client';
import httpStatus from 'http-status';
import { pick } from '../../../shared/utils';
import { serviceFilterableFields } from './service.constant';
import { paginationFields } from '../../../constant/pagination';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await ServiceService.insertIntoDB(req.body);
    sendResponse<Service>(res, {
        statusCode: httpStatus.CREATED,
        data: result,
        message: 'Service created successfully',
        success: true,
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, serviceFilterableFields);
    const options = pick(req.query, paginationFields);
    const result = await ServiceService.getAllFromDB(filters, options);
    sendResponse<Service[]>(res, {
        statusCode: httpStatus.OK,
        data: result.data,
        meta: result.meta,
        message: 'Services fetched successfully',
        success: true,
    });
});

const getOneFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ServiceService.getOneFromDB(id);
    sendResponse<Service>(res, {
        statusCode: httpStatus.OK,
        data: result,
        message: 'Service fetched successfully',
        success: true,
    });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ServiceService.updateOneInDB(id, req.body);
    sendResponse<Service>(res, {
        statusCode: httpStatus.OK,
        data: result,
        message: 'Service updated successfully',
        success: true,
    });
});

const deleteOneFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ServiceService.deleteOneFromDB(id);
    sendResponse<Service>(res, {
        statusCode: httpStatus.OK,
        data: result,
        message: 'Service deleted successfully',
        success: true,
    });
});

export const ServiceController = {
    insertIntoDB,
    getAllFromDB,
    getOneFromDB,
    updateOneInDB,
    deleteOneFromDB,
};
