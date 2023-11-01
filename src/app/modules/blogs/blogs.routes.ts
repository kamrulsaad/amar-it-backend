import { USER_ROLE } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import { BlogController } from './blogs.controller';
import { BlogValidation } from './blogs.validation';

const router = express.Router();

router.post(
    '/',
    auth(USER_ROLE.admin),
    FileUploadHelper.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = BlogValidation.createBlogZodSchema.parse(
            JSON.parse(req.body.data),
        );
        return BlogController.insertIntoDB(req, res, next);
    },
);

router.get('/', BlogController.getAllFromDB);
router
    .route('/:id')
    .get(BlogController.getByIdFromDB)
    .patch(
        auth(USER_ROLE.admin),
        FileUploadHelper.upload.single('file'),
        (req: Request, res: Response, next: NextFunction) => {
            req.body = BlogValidation.updateBlogZodSchema.parse(
                JSON.parse(req.body.data),
            );
            return BlogController.updateIntoDB(req, res, next);
        },
    )
    .delete(
        auth(USER_ROLE.admin),
        BlogController.deleteFromDB,
    );

export const BlogsRoute = router;
