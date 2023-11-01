import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import path from 'path';
import config from '../config';
import {
    CloudinaryParams,
    ICloudinaryResponse,
    IUploadFile,
} from '../interface/file';
import ApiError from '../errors/ApiError';
import httpStatus from 'http-status';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
    secure: true,
});

const params: CloudinaryParams = {
    folder: 'uploads',
    unique_filename: true,
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
};

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: params,
});
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase(),
        );
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(
            new Error(
                `Error: File upload only supports the following filetypes - ${filetypes}`,
            ),
        );
    },
    limits: { fileSize: 1024 * 1024 * 5 },
});

const uploadToCloudinary = async (
    file: IUploadFile,
): Promise<ICloudinaryResponse | undefined> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            file.path,
            (error: Error, result: ICloudinaryResponse) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            },
        );
    });
};

const destroyToCloudinary = async (
    secureUrl: string,
): Promise<ICloudinaryResponse | undefined> => {
    return new Promise((resolve, reject) => {
        const parts = secureUrl.split('/');
        const public_id = parts[parts.length - 1].split('.')[0];
        cloudinary.uploader.destroy(
            public_id,
            (error: Error, result: ICloudinaryResponse) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            },
        );
    });
};

const replaceImage = async (
    existingSecureUrl: string,
    newFile: IUploadFile,
): Promise<ICloudinaryResponse | undefined> => {
    try {
        await destroyToCloudinary(existingSecureUrl);
        return await uploadToCloudinary(newFile);
    } catch (error) {
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            'Image upload failed',
        );
    }
};

export const FileUploadHelper = {
    uploadToCloudinary,
    upload,
    destroyToCloudinary,
    replaceImage,
};
