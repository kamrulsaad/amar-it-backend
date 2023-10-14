import { Customer, USER_ROLE, User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { AuthUtils } from './auth.utils';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const signUp = async (user: User, customer: Customer): Promise<Customer> => {
  const { password, ...rest } = user;

  const isUserNameExist = await prisma.user.findUnique({
    where: {
      username: user.username,
    },
  });

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

export const AuthService = {
  signUp,
};
