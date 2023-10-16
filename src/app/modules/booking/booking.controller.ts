import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BookingService } from './booking.service';
import { JwtPayload } from 'jsonwebtoken';
import sendResponse from '../../../shared/sendResponse';
import { Booking } from '@prisma/client';
import httpStatus from 'http-status';
import { pick } from '../../../shared/utils';
import { bookingFilterableFields } from './booking.constant';
import { paginationFields } from '../../../constant/pagination';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { username } = req.user as JwtPayload;
    const result = await BookingService.insertIntoDB(username, req.body);
    sendResponse<Booking>(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Booking created successfully',
        data: result,
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, bookingFilterableFields);
    const options = pick(req.query, paginationFields);
    const result = await BookingService.getAllFromDB(filters, options);
    sendResponse<Booking[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bookings fetched successfully',
        data: result.data,
        meta: result.meta,
    });
});

const getSingleFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookingService.getSingleFromDB(id);
    sendResponse<Booking>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking fetched successfully',
        data: result,
    });
});

const updateInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookingService.updateInDB(id, req.body);
    sendResponse<Booking>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking updated successfully',
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookingService.deleteFromDB(id);
    sendResponse<Booking>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking deleted successfully',
        data: result,
    });
});

export const BookingController = {
    insertIntoDB,
    getAllFromDB,
    getSingleFromDB,
    updateInDB,
    deleteFromDB,
};
