import { USER_ROLE } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import { HomeBannerController } from './home-banner.controller';
import { HomeBannerValidation } from './home-banner.validation';

const router = express.Router();

router.post(
    '/',
    auth(USER_ROLE.admin),
    FileUploadHelper.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = HomeBannerValidation.createHomeBannerZodSchema.parse(
            JSON.parse(req.body.data),
        );
        return HomeBannerController.insertIntoDB(req, res, next);
    },
);

router.get('/', HomeBannerController.getAllFromDB);
router
    .route('/:id')
    .get(HomeBannerController.getByIdFromDB)
    .patch(
        auth(USER_ROLE.admin),
        FileUploadHelper.upload.single('file'),
        (req: Request, res: Response, next: NextFunction) => {
            req.body = HomeBannerValidation.updateHomeBannerZodSchema.parse(
                JSON.parse(req.body.data),
            );
            return HomeBannerController.updateIntoDB(req, res, next);
        },
    )
    .delete(
        auth(USER_ROLE.admin),
        HomeBannerController.deleteFromDB,
    );

export const HomeBannerContentsRoute = router;
