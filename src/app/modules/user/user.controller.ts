import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import { Admin } from '@prisma/client';
import httpStatus from 'http-status';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { user, admin } = req.body;

  const result = await UserService.createAdmin(admin, user);

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
