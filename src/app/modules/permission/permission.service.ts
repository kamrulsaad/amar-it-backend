/* eslint-disable @typescript-eslint/no-explicit-any */
import { Permission, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/pagination';
import prisma from '../../../shared/prisma';
import { permissionSearchableFields } from './permission.constant';
import { IPermissionFilterRequest } from './permission.interface';

const insertIntoDB = async (payload: Permission): Promise<Permission> => {
    const result = await prisma.permission.create({
        data: payload,
    });

    return result;
};

const getAllFromDB = async (
    filters: IPermissionFilterRequest,
    options: IPaginationOptions,
): Promise<IGenericResponse<Permission[] | null>> => {
    const { limit, page, skip } =
        paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: permissionSearchableFields.map(field => ({
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
                    equals: (filterData as any)[key],
                },
            })),
        });
    }

    const whereConditions: Prisma.PermissionWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.permission.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy:
            options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {
                      title: 'asc',
                  },
    });
    const total = await prisma.permission.count({
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

const getSingleFromDB = async (id: string): Promise<Permission | null> => {
    const result = await prisma.permission.findUnique({
        where: {
            id,
        },
    });

    return result;
};

const updateOneInDB = async (
    id: string,
    payload: Permission,
): Promise<Permission | null> => {
    const result = await prisma.permission.update({
        where: {
            id,
        },
        data: payload,
    });

    return result;
};

const deleteOneFromDB = async (id: string): Promise<Permission | null> => {
    const result = await prisma.permission.delete({
        where: {
            id,
        },
    });

    return result;
};

export const PermissionService = {
    insertIntoDB,
    getAllFromDB,
    getSingleFromDB,
    deleteOneFromDB,
    updateOneInDB,
};
