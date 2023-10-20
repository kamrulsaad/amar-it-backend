import { Customer } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { AuthService } from './auth.service';

const signUp = catchAsync(async (req: Request, res: Response) => {
    const { user, customer } = req.body;

    // const file = req.file as IUploadFile;

    const result = await AuthService.signUp(user, customer);
    sendResponse<Customer>(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Customer signed up successfully',
        data: result,
    });
});

const login = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;

    const result = await AuthService.login(loginData);
    const { refreshToken, ...others } = result;

    // set refresh token into cookie
    const cookieOptions: {
        secure: boolean;
        httpOnly: boolean;
        sameSite?: 'none' | undefined;
    } = {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<Partial<ILoginUserResponse>>(res, {
        statusCode: httpStatus.OK,
        message: 'User logged in successfully',
        data: others,
        success: true,
    });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const result = await AuthService.refreshToken(refreshToken);

    // set refresh token into cookie
    const cookieOptions: {
        secure: boolean;
        httpOnly: boolean;
        sameSite?: 'none' | undefined;
    } = {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<IRefreshTokenResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully!',
        data: result,
    });
});

const logout = catchAsync(async (req: Request, res: Response) => {
    const { username } = req.user as { username: string };
    const result = await AuthService.logout(username);

    const cookieOptions: {
        secure: boolean;
        httpOnly: boolean;
        sameSite?: 'none' | undefined;
    } = {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
    };

    // Remove the refreshToken cookie from the response
    res.clearCookie('refreshToken', cookieOptions);

    sendResponse<IRefreshTokenResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged out successfully!',
        data: result,
    });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    const { username } = req.user as JwtPayload;
    const result = await AuthService.resetPassword(
        username,
        oldPassword,
        newPassword,
    );
    sendResponse<IRefreshTokenResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password reset successfully',
        data: result,
    });
});

export const AuthController = {
    signUp,
    login,
    refreshToken,
    logout,
    resetPassword,
};
