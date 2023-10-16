import { Feedback } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const insertIntoDB = async (
    data: Feedback,
    username: string,
): Promise<Feedback> => {
    const customer = await prisma.customer.findUnique({
        where: {
            username,
        },
    });

    if (!customer) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
    }
    return await prisma.feedback.create({
        data: {
            ...data,
            customerId: customer.id,
        },
    });
};

const getAllFromDB = async (): Promise<Feedback[]> => {
    return await prisma.feedback.findMany({
        include: {
            customer: {
                select: {
                    username: true,
                },
            },
            package: {
                select: {
                    title: true,
                },
            },
        },
    });
};

const updateIntoDB = async (
    id: string,
    payload: Partial<Feedback>,
): Promise<Feedback> => {
    return await prisma.feedback.update({
        where: {
            id,
        },
        include: {
            customer: {
                select: {
                    username: true,
                },
            },
            package: {
                select: {
                    title: true,
                },
            },
        },
        data: payload,
    });
};

const deleteFromDB = async (id: string): Promise<Feedback> => {
    return await prisma.feedback.delete({
        where: {
            id,
        },
    });
};

const getSingleFromDB = async (id: string): Promise<Feedback | null> => {
    return await prisma.feedback.findUnique({
        where: {
            id,
        },
        include: {
            customer: {
                select: {
                    username: true,
                },
            },
            package: {
                select: {
                    title: true,
                },
            },
        },
    });
};

export const FeedbackService = {
    insertIntoDB,
    getAllFromDB,
    updateIntoDB,
    deleteFromDB,
    getSingleFromDB,
};
