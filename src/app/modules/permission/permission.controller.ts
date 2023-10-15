import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { PermissionService } from './permission.service';
import sendResponse from '../../../shared/sendResponse';
import { Permission } from '@prisma/client';
import httpStatus from 'http-status';
import { permissionFilterableFields } from './permission.constant';
import { pick } from '../../../shared/utils';
import { paginationFields } from '../../../constant/pagination';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await PermissionService.insertIntoDB(req.body);

  sendResponse<Permission>(res, {
    statusCode: httpStatus.CREATED,
    message: 'Permission created successfully',
    success: true,
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, permissionFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await PermissionService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcademicFaculties fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await PermissionService.getSingleFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Permission fetched successfully',
    data: result,
  });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const result = await PermissionService.updateOneInDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Permission updated successfully',
    data: result,
  });
});

const deleteOneFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await PermissionService.deleteOneFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Permission deleted successfully',
    data: result,
  });
});

export const PermissionController = {
  insertIntoDB,
  getAllFromDB,
  getSingleFromDB,
  deleteOneFromDB,
  updateOneInDB,
};
