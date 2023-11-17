/* eslint-disable @typescript-eslint/no-explicit-any */
import { Package, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IPackageFilterRequest } from './package.interface';
import { IPaginationOptions } from '../../../interface/pagination';
import { IGenericResponse } from '../../../interface/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { packageSearchableFields } from './package.constant';

const insertIntoDB = async (payload: Package): Promise<Package> => {
    return await prisma.package.create({
        data: payload,
    });
};

const getAllFromDB = async (
    filters: IPackageFilterRequest,
    options: IPaginationOptions,
): Promise<IGenericResponse<Package[] | null>> => {
    const { limit, page, skip } =
        paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: packageSearchableFields.map(field => ({
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

    const whereConditions: Prisma.PackageWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.package.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy:
            options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {
                      createdAt: 'asc',
                  },
    });
    const total = await prisma.package.count({
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

const getSingleFromDB = async (id: string): Promise<Package | null> => {
    return await prisma.package.findUnique({
        where: {
            id,
        },
        include: {
            service: true,
        },
    });
};

const updateSingleInDB = async (
    id: string,
    payload: Package,
): Promise<Package> => {
    return await prisma.package.update({
        where: {
            id,
        },
        data: payload,
    });
};

const deleteOneFromDB = async (id: string): Promise<Package> => {
    return await prisma.package.delete({
        where: {
            id,
        },
    });
};

export const PackageService = {
    insertIntoDB,
    getAllFromDB,
    getSingleFromDB,
    updateSingleInDB,
    deleteOneFromDB,
};
