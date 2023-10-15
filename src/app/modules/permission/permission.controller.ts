import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { PermissionService } from './permission.service';
import sendResponse from '../../../shared/sendResponse';
import { Permission } from '@prisma/client';
import httpStatus from 'http-status';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await PermissionService.insertIntoDB(req.body);

  sendResponse<Permission>(res, {
    statusCode: httpStatus.CREATED,
    message: 'Permission created successfully',
    success: true,
    data: result,
  });
});

export const PermissionController = {
  insertIntoDB,
};
