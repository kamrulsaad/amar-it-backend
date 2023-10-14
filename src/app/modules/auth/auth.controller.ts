import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const result = 'Hello World';
  sendResponse<string>(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: 'User signed up successfully',
  });
});

export const AuthController = {
  signUp,
};
