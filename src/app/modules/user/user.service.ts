import { Admin, USER_ROLE, User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { IUploadFile } from '../../../interface/file';
import prisma from '../../../shared/prisma';
import { AuthUtils } from '../auth/auth.utils';

const createAdmin = async (
    admin: Admin,
    user: User,
    file: IUploadFile,
): Promise<Admin> => {
    const { password, ...rest } = user;

    const isUserNameExist = await AuthUtils.isUserExist(user.username);

    if (isUserNameExist) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Username already exists');
    }

    const result = await prisma.$transaction(
        async transactionClient => {
            const hashedPassword = await AuthUtils.hashPassword(password);
            const createdUser = await transactionClient.user.create({
                data: {
                    ...rest,
                    role: USER_ROLE.admin,
                    password: hashedPassword,
                },
            });
            const uploadedImage =
                await FileUploadHelper.uploadToCloudinary(file);
            if (!uploadedImage) {
                throw new ApiError(
                    httpStatus.BAD_REQUEST,
                    'Image upload failed',
                );
            }

            const result = await transactionClient.admin.create({
                data: {
                    ...admin,
                    profileImage: uploadedImage.secure_url as string,
                    username: createdUser.username,
                },
                include: {
                    permission: true,
                },
            });

            return result;
        },
        { timeout: 10000 },
    );

    return result;
};

export const UserService = {
    createAdmin,
};
