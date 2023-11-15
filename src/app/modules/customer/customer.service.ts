import { Customer, Feedback, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interface/common';
import { IUploadFile } from '../../../interface/file';
import { IPaginationOptions } from '../../../interface/pagination';
import prisma from '../../../shared/prisma';
import { customerSearchableFields } from './customer.constant';
import { ICustomerFilterRequest } from './customer.interface';

const getAllFromDB = async (
    filters: ICustomerFilterRequest,
    options: IPaginationOptions,
): Promise<IGenericResponse<Customer[] | null>> => {
    const { limit, page, skip } =
        paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: customerSearchableFields.map(field => ({
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

    const whereConditions: Prisma.CustomerWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.customer.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy:
            options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {
                      createdAt: 'desc',
                  },
    });
    const total = await prisma.customer.count({
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

const getSingleFromDB = async (id: string): Promise<Customer | null> => {
    const result = await prisma.customer.findUnique({
        where: {
            id,
        },
    });

    return result;
};

const updateOneInDB = async (
    id: string,
    data: Prisma.CustomerUpdateInput,
    file: IUploadFile,
): Promise<Customer | null> => {
    const isCustomerExist = await prisma.customer.findUnique({
        where: {
            id,
        },
    });

    if (!isCustomerExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
    }

    if (file && isCustomerExist.profileImage) {
        const newImageURL = await FileUploadHelper.replaceImage(
            isCustomerExist.profileImage,
            file,
        );
        if (newImageURL) {
            data.profileImage = newImageURL.secure_url as string;
        }
    } else {
        if (file) {
            const newImageURL = await FileUploadHelper.uploadToCloudinary(file);
            if (newImageURL) {
                data.profileImage = newImageURL.secure_url as string;
            }
        }
    }

    const result = await prisma.customer.update({
        where: {
            id,
        },
        data: {
            ...data,
        },
    });

    return result;
};

const deleteFromDB = async (id: string): Promise<Customer | null> => {
    const result = await prisma.$transaction(async transactionClient => {
        const deletedCustomer = await transactionClient.customer.delete({
            where: {
                id,
            },
        });

        if (!deletedCustomer) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
        }

        if (deletedCustomer.profileImage)
            await FileUploadHelper.destroyToCloudinary(
                deletedCustomer.profileImage,
            );

        await transactionClient.user.delete({
            where: {
                username: deletedCustomer.username,
            },
        });

        return deletedCustomer;
    });

    return result;
};

const getCustomerFeedbackFromDB = async (
    userName: string,
    id: string,
): Promise<Feedback | null> => {
    const result = await prisma.feedback.findUnique({
        where: {
            id,
        },
        include: {
            customer: {
                select: {
                    username: true,
                },
            },
        },
    });

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Feedback not found');
    }

    if (result?.customer?.username !== userName) {
        throw new ApiError(
            httpStatus.FORBIDDEN,
            'You are not authorized to access this feedback',
        );
    }

    return result;
};

export const CustomerService = {
    getAllFromDB,
    getSingleFromDB,
    deleteFromDB,
    updateOneInDB,
    getCustomerFeedbackFromDB,
};
