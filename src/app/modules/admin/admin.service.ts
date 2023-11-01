import { Admin, Prisma } from '@prisma/client';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { adminSearchableFields } from './admin.constant';
import prisma from '../../../shared/prisma';
import { IAdminFilterRequest } from './admin.interface';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IUploadFile } from '../../../interface/file';

const getAllFromDB = async (
    filters: IAdminFilterRequest,
    options: IPaginationOptions,
): Promise<IGenericResponse<Admin[] | null>> => {
    const { limit, page, skip } =
        paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: adminSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    equals: (filterData as any)[key],
                },
            })),
        });
    }

    const whereConditions: Prisma.AdminWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.admin.findMany({
        where: whereConditions,
        skip,
        take: limit,
        include: {
            permission: true,
        },
        orderBy:
            options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {
                      createdAt: 'desc',
                  },
    });
    const total = await prisma.admin.count({
        where: whereConditions,
    });

    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
};

const getSingleFromDB = async (id: string): Promise<Admin | null> => {
    const result = await prisma.admin.findUnique({
        where: {
            id,
        },
        include: {
            permission: true,
        },
    });

    return result;
};

const updateOneInDB = async (
    id: string,
    data: Prisma.AdminUpdateInput,
    file: IUploadFile,
): Promise<Admin | null> => {
    const isAdminExist = await prisma.admin.findUnique({
        where: {
            id,
        },
    });

    if (!isAdminExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
    }

    if (file && isAdminExist.profileImage) {
        const newImageURL = await FileUploadHelper.replaceImage(
            isAdminExist.profileImage,
            file,
        );
        if (newImageURL) {
            data.profileImage = newImageURL.secure_url as string;
        }
    }

    const result = await prisma.admin.update({
        where: {
            id,
        },
        data: {
            ...data,
        },
        include: {
            permission: true,
        },
    });

    return result;
};

const deleteFromDB = async (id: string): Promise<Admin | null> => {
    const result = await prisma.$transaction(async transactionClient => {
        const deletedAdmin = await transactionClient.admin.delete({
            where: {
                id,
            },
        });

        if (!deletedAdmin) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
        }

        if (deletedAdmin.profileImage)
            await FileUploadHelper.destroyToCloudinary(
                deletedAdmin.profileImage,
            );

        await transactionClient.user.delete({
            where: {
                username: deletedAdmin.username,
            },
        });

        return deletedAdmin;
    });

    return result;
};

export const AdminService = {
    getAllFromDB,
    getSingleFromDB,
    deleteFromDB,
    updateOneInDB,
};
