import { FAQ } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: FAQ): Promise<FAQ> => {
    return await prisma.fAQ.create({
        data,
    });
};

const getAllFromDB = async (): Promise<FAQ[]> => {
    return await prisma.fAQ.findMany();
};

const getByIdFromDB = async (id: string): Promise<FAQ | null> => {
    return await prisma.fAQ.findUnique({
        where: {
            id,
        },
    });
};

const updateIntoDB = async (
    id: string,
    payload: Partial<FAQ>,
): Promise<FAQ> => {
    return await prisma.fAQ.update({
        where: {
            id,
        },
        data: payload,
    });
};
const deleteFromDB = async (id: string): Promise<FAQ> => {
    return await prisma.fAQ.delete({
        where: {
            id,
        },
    });
};

export const FaqService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
};
