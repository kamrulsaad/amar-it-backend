import { Admin, USER_ROLE, User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { AuthUtils } from '../auth/auth.utils';

const createAdmin = async (admin: Admin, user: User) => {
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
        role: USER_ROLE.admin,
        password: hashedPassword,
      },
    });

    const result = await transactionClient.admin.create({
      data: {
        ...admin,
        username: createdUser.username,
        permissionId: '0a09b99b-621a-42c3-b225-c966be9df738',
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
        permission: true,
      },
    });

    return result;
  });

  return result;
};

export const UserService = {
  createAdmin,
};
