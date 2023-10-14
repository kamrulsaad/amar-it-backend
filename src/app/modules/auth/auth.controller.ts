import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';
import { Customer } from '@prisma/client';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const { user, customer } = req.body;
  const result = await AuthService.signUp(user, customer);
  sendResponse<Customer>(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: 'Customer signed up successfully',
  });
});

export const AuthController = {
  signUp,
};
