import { HomeBannerContents } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { IUploadFile } from '../../../interface/file';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (
    data: HomeBannerContents,
    file: IUploadFile,
): Promise<HomeBannerContents> => {
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);
    if (!uploadedImage) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Image upload failed');
    }
    return await prisma.$transaction(async tx => {
        return tx.homeBannerContents.create({
            data: {
                ...data,
                image: uploadedImage.secure_url as string,
            },
        });
    });
};

const getAllFromDB = async (): Promise<HomeBannerContents[]> => {
    return await prisma.homeBannerContents.findMany();
};

const getByIdFromDB = async (
    id: string,
): Promise<HomeBannerContents | null> => {
    return await prisma.homeBannerContents.findUnique({
        where: {
            id,
        },
    });
};

const updateIntoDB = async (
    id: string,
    file: IUploadFile,
    payload: Partial<HomeBannerContents>,
): Promise<HomeBannerContents> => {
    const isExistHomeBanner = await prisma.homeBannerContents.findUnique({
        where: { id },
    });

    if (!isExistHomeBanner) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Home Banner not found');
    }

    const result = await prisma.$transaction(async tx => {
        if (file && isExistHomeBanner.image) {
            const response = await FileUploadHelper.replaceImage(
                isExistHomeBanner.image,
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

        const result = await tx.homeBannerContents.update({
            where: { id },
            data: payload,
        });

        if (!result) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Update failed');
        }

        return result;
    });

    return result;
};

const deleteFromDB = async (id: string): Promise<HomeBannerContents> => {
    return await prisma.$transaction(async tx => {
        const isExistHomeBanner = await tx.homeBannerContents.findUnique({
            where: { id },
            select: { image: true },
        });

        if (isExistHomeBanner?.image) {
            await FileUploadHelper.destroyToCloudinary(isExistHomeBanner.image);
        }
        return tx.homeBannerContents.delete({
            where: { id },
        });
    });
};

export const HomeBannerService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
};
