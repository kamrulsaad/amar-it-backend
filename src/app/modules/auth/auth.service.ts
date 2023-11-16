import { USER_ROLE, User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { JwtHelper } from '../../../helpers/jwtHelper';
import prisma from '../../../shared/prisma';
import {
    ILoginUser,
    ILoginUserResponse,
    IRefreshTokenResponse,
} from './auth.interface';
import { AuthUtils } from './auth.utils';

const signUp = async (user: User): Promise<User> => {
    const { password, ...rest } = user;

    const isUserNameExist = await AuthUtils.isUserExist(user.username);

    if (isUserNameExist) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Username already exists');
    }

    const result = await prisma.$transaction(async transactionClient => {
        const hashedPassword = await AuthUtils.hashPassword(password);

        const result = await transactionClient.user.create({
            data: {
                ...rest,
                role: USER_ROLE.customer,
                password: hashedPassword,
            },
        });

        await transactionClient.customer.create({
            data: {
                username: result.username,
            },
        });

        return result;
    });

    return result;
};

const login = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
    const { username, password } = payload;

    const user = await AuthUtils.isUserExist(username);

    if (!user) {
        throw new ApiError(
            httpStatus.UNAUTHORIZED,
            'Invalid username or password',
        );
    }

    const { role } = user;

    const isPasswordValid = await AuthUtils.isPasswordValid(
        password,
        user.password,
    );

    if (!isPasswordValid) {
        throw new ApiError(
            httpStatus.UNAUTHORIZED,
            'Invalid username or password',
        );
    }

    const accessToken = JwtHelper.createToken(
        { username, role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string,
    );

    const refreshToken = JwtHelper.createToken(
        { username, role },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string,
    );

    return { accessToken, refreshToken };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
    let verifiedToken = null;
    try {
        verifiedToken = JwtHelper.verifyToken(
            token,
            config.jwt.refresh_secret as Secret,
        );
    } catch (err) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
    }

    const { username, role } = verifiedToken;

    const isUserExist = await AuthUtils.isUserExist(username);

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    const newAccessToken = JwtHelper.createToken(
        { username, role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string,
    );

    return {
        accessToken: newAccessToken,
    };
};

const resetPassword = async (
    username: string,
    oldPassword: string,
    newPassword: string,
): Promise<IRefreshTokenResponse> => {
    const isUserExist = await AuthUtils.isUserExist(username);
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    const isPasswordMatch = await AuthUtils.isPasswordValid(
        oldPassword,
        isUserExist.password,
    );
    if (!isPasswordMatch) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
    }
    const hashedPassword = await AuthUtils.hashPassword(newPassword);

    const result = await prisma.user.update({
        where: {
            username,
        },
        data: {
            password: hashedPassword,
        },
    });

    const newAccessToken = JwtHelper.createToken(
        { username, role: result.role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string,
    );

    return {
        accessToken: newAccessToken,
    };
};

const logout = async (
    username: string,
): Promise<IRefreshTokenResponse | null> => {
    const isUserExist = await AuthUtils.isUserExist(username);
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return {
        accessToken: '',
    };
};

export const AuthService = {
    signUp,
    login,
    logout,
    refreshToken,
    resetPassword,
};
