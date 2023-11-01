import { Admin } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUploadFile } from './../../../interface/file';
import { UserService } from './user.service';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const { user, admin } = req.body;

    const file = req.file as IUploadFile;

    const result = await UserService.createAdmin(admin, user, file);

    sendResponse<Admin>(res, {
        statusCode: httpStatus.CREATED,
        message: 'Admin created successfully',
        success: true,
        data: result,
    });
});

export const UserController = {
    createAdmin,
};
