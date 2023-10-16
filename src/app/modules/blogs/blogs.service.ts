/* eslint-disable @typescript-eslint/no-explicit-any */
import { Blog, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interface/common';
import { IUploadFile } from '../../../interface/file';
import { IPaginationOptions } from '../../../interface/pagination';
import prisma from '../../../shared/prisma';
import {
    blogsRelationalFields,
    blogsRelationalFieldsMapper,
    blogsSearchableFields,
} from './blogs.constant';
import { IBlogFilterRequest } from './blogs.interface';

const insertIntoDB = async (data: Blog, file: IUploadFile): Promise<Blog> => {
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);
    if (!uploadedImage) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Image upload failed');
    }
    return await prisma.$transaction(async tx => {
        return tx.blog.create({
            data: {
                ...data,
                image: uploadedImage.secure_url as string,
            },
            include: {
                blogCategory: true,
            },
        });
    });
};

const getAllFromDB = async (
    filters: IBlogFilterRequest,
    options: IPaginationOptions,
): Promise<IGenericResponse<Blog[]>> => {
    const { limit, page, skip } =
        paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: blogsSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                if (blogsRelationalFields.includes(key)) {
                    return {
                        [blogsRelationalFieldsMapper[key]]: {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            id: (filterData as any)[key],
                        },
                    };
                } else {
                    return {
                        [key]: {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            equals: (filterData as any)[key],
                        },
                    };
                }
            }),
        });
    }

    const whereConditions: Prisma.BlogWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.blog.findMany({
        where: whereConditions,
        include: {
            blogCategory: true,
        },
        skip,
        take: limit,
        orderBy:
            options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {
                      createdAt: 'desc',
                  },
    });
    const total = await prisma.blog.count({
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

const getByIdFromDB = async (id: string): Promise<Blog | null> => {
    return await prisma.blog.findUnique({
        where: {
            id,
        },
        include: {
            blogCategory: true,
        },
    });
};

const updateIntoDB = async (
    id: string,
    file: IUploadFile,
    payload: Partial<Blog>,
): Promise<Blog> => {
    return await prisma.$transaction(async tx => {
        const existingBlog = await tx.blog.findUnique({
            where: { id },
        });

        if (!existingBlog) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
        }

        if (file && existingBlog.image) {
            const response = await FileUploadHelper.replaceImage(
                existingBlog.image,
                file,
            );
            if (!response) {
                throw new ApiError(
                    httpStatus.BAD_REQUEST,
                    'Image upload failed',
                );
            }
            payload.image = response.secure_url as string;
        }

        return tx.blog.update({
            where: { id },
            data: payload,
            include: {
                blogCategory: true,
            },
        });
    });
};

const deleteFromDB = async (id: string): Promise<Blog> => {
    return await prisma.$transaction(async tx => {
        const existingBlog = await tx.blog.findUnique({
            where: { id },
            select: { image: true },
        });

        if (existingBlog?.image) {
            await FileUploadHelper.destroyToCloudinary(existingBlog.image);
        }
        return tx.blog.delete({
            where: { id },
            include: {
                blogCategory: true,
            },
        });
    });
};

export const BlogService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
};
