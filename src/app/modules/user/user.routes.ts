import express, { NextFunction, Request, Response } from 'express';
const router = express.Router();
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '@prisma/client';

router.post(
    '/create-admin',
    auth(USER_ROLE.super_admin),
    FileUploadHelper.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createAdminSchema.parse(
            JSON.parse(req.body.data),
        );
        return UserController.createAdmin(req, res, next);
    },
);

export const UserRoutes = router;
