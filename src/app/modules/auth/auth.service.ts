import { Customer, USER_ROLE, User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { AuthUtils } from './auth.utils';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
import { JwtHelper } from '../../../helpers/jwtHelper';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const signUp = async (user: User, customer: Customer): Promise<Customer> => {
  const { password, ...rest } = user;

  const isUserNameExist = await AuthUtils.isUserExist(user.username);

  if (isUserNameExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already exists');
  }

  const result = await prisma.$transaction(async transactionClient => {
    const hashedPassword = await AuthUtils.hashPassword(password);
    const createdUser = await transactionClient.user.create({
      data: {
        ...rest,
        role: USER_ROLE.customer,
        password: hashedPassword,
      },
    });

    const result = await transactionClient.customer.create({
      data: {
        ...customer,
        username: createdUser.username,
      },
      include: {
        user: {
          select: {
            username: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
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
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid username or password');
  }

  const { role } = user;

  const isPasswordValid = await AuthUtils.isPasswordValid(
    password,
    user.password,
  );

  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid username or password');
  }

  const accessToken = await JwtHelper.createToken(
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

// const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
//   let verifiedToken = null;

//   try {
//     verifiedToken = JwtHelper.verifyToken(
//       token,
//       config.jwt.refresh_secret as Secret,
//     );
//   } catch (error) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Refresh Token');
//   }

//   const { id } = verifiedToken;

//   const isUserExist = await A

//   if (!isUserExist) {
//     throw new ApiError('User does not exist', httpStatus.NOT_FOUND);
//   }

//   const newAccessToken = JwtHelper.createToken(
//     { id: isUserExist.id, role: isUserExist.role },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string,
//   );

//   return {
//     accessToken: newAccessToken,
//   };
// };

export const AuthService = {
  signUp,
  login,
};
