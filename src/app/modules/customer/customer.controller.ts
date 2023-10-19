import { Customer, Feedback } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { paginationFields } from '../../../constant/pagination';
import { IUploadFile } from '../../../interface/file';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { pick } from '../../../shared/utils';
import { customerFilterableFields } from './customer.constant';
import { CustomerService } from './customer.service';

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, customerFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await CustomerService.getAllFromDB(
        filters,
        paginationOptions,
    );

    sendResponse<Customer[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Customers retrieved successfully !',
        meta: result.meta,
        data: result.data,
    });
});

const getSingleFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await CustomerService.getSingleFromDB(id);

    sendResponse<Customer>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Customer retrieved successfully !',
        data: result,
    });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const file = req.file as IUploadFile;

    const result = await CustomerService.updateOneInDB(id, req.body, file);

    sendResponse<Customer>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Customer updated successfully !',
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await CustomerService.deleteFromDB(id);

    sendResponse<Customer>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Customer deleted successfully !',
        data: result,
    });
});

const getCustomerFeedbackFromDB = catchAsync(
    async (req: Request, res: Response) => {
        const { feedbackID } = req.params;
        const { username } = req.user as JwtPayload;
        const result = await CustomerService.getCustomerFeedbackFromDB(
            username,
            feedbackID,
        );

        sendResponse<Feedback>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Feedback retrieved successfully !',
            data: result,
        });
    },
);

export const CustomerController = {
    getAllFromDB,
    getSingleFromDB,
    deleteFromDB,
    updateOneInDB,
    getCustomerFeedbackFromDB,
};
