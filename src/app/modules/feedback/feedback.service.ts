import { Feedback } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Feedback): Promise<Feedback> => {
    return await prisma.feedback.create({
        data,
    });
};

const getAllFromDB = async (): Promise<Feedback[]> => {
    return await prisma.feedback.findMany();
};

const updateIntoDB = async (
    id: string,
    payload: Partial<Feedback>,
): Promise<Feedback> => {
    return await prisma.feedback.update({
        where: {
            id,
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

export const FeedbackService = {
    insertIntoDB,
    getAllFromDB,
    updateIntoDB,
    deleteFromDB,
};
