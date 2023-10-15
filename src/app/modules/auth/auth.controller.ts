import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';
import { Customer } from '@prisma/client';
import config from '../../../config';
import { ILoginUserResponse } from './auth.interface';
import httpStatus from 'http-status';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const { user, customer } = req.body;
  const result = await AuthService.signUp(user, customer);
  sendResponse<Customer>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    data: result,
    message: 'Customer signed up successfully',
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthService.login(loginData);
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    httpOnly: true,
    secure: config.env === 'production',
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<Partial<ILoginUserResponse>>(res, {
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: others,
    success: true,
  });
});

export const AuthController = {
  signUp,
  login,
};
