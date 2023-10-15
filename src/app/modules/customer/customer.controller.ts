import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { paginationFields } from '../../../constant/pagination';
import { pick } from '../../../shared/utils';
import sendResponse from '../../../shared/sendResponse';
import { Customer } from '@prisma/client';
import httpStatus from 'http-status';
import { IUploadFile } from '../../../interface/file';
import { customerSearchableFields } from './customer.constant';
import { CustomerService } from './customer.service';

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, customerSearchableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CustomerService.getAllFromDB(filters, paginationOptions);

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

export const CustomerController = {
  getAllFromDB,
  getSingleFromDB,
  deleteFromDB,
  updateOneInDB,
};
