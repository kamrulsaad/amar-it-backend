import { BlogCategory } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: BlogCategory): Promise<BlogCategory> => {
    return await prisma.blogCategory.create({
        data,
    });
};

const getAllFromDB = async (): Promise<BlogCategory[]> => {
    return await prisma.blogCategory.findMany();
};

const getByIdFromDB = async (id: string): Promise<BlogCategory | null> => {
    return await prisma.blogCategory.findUnique({
        where: {
            id,
        },
    });
};

const updateIntoDB = async (
    id: string,
    payload: Partial<BlogCategory>,
): Promise<BlogCategory> => {
    return await prisma.blogCategory.update({
        where: {
            id,
        },
        data: payload,
    });
};

const deleteFromDB = async (id: string): Promise<BlogCategory> => {
    return await prisma.blogCategory.delete({
        where: {
            id,
        },
    });
};

export const BlogCategoryService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
};
