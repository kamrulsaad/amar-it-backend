import { Prisma, Service } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IServiceFilterRequest } from './service.interface';
import { IPaginationOptions } from '../../../interface/pagination';
import { IGenericResponse } from '../../../interface/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { serviceSearchableFields } from './service.constant';

const insertIntoDB = async (payload: Service): Promise<Service> => {
    const result = await prisma.service.create({
        data: payload,
    });
    return result;
};

const getAllFromDB = async (
    filters: IServiceFilterRequest,
    options: IPaginationOptions,
): Promise<IGenericResponse<Service[] | null>> => {
    const { limit, page, skip } =
        paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: serviceSearchableFields.map(field => ({
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

    const whereConditions: Prisma.ServiceWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.service.findMany({
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
    const total = await prisma.service.count({
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

const getOneFromDB = async (id: string): Promise<Service | null> => {
    const result = await prisma.service.findUnique({
        where: {
            id,
        },
    });
    return result;
};

const updateOneInDB = async (
    id: string,
    payload: Service,
): Promise<Service | null> => {
    const result = await prisma.service.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
};

const deleteOneFromDB = async (id: string): Promise<Service | null> => {
    const result = await prisma.service.delete({
        where: {
            id,
        },
    });
    return result;
};

export const ServiceService = {
    insertIntoDB,
    getAllFromDB,
    getOneFromDB,
    updateOneInDB,
    deleteOneFromDB,
};
