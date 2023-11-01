import { USER_ROLE } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidations } from './auth.validations';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
const router = express.Router();

router.post(
    '/signup',
    FileUploadHelper.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = AuthValidations.signUpSchema.parse(
            JSON.parse(req.body.data),
        );
        return AuthController.signUp(req, res, next);
    },
);

router.post(
    '/login',
    validateRequest(AuthValidations.loginZodSchema),
    AuthController.login,
);

router.post(
    '/refresh-token',
    validateRequest(AuthValidations.refreshToken),
    AuthController.refreshToken,
);

router.delete(
    '/logout',
    auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.customer),
    AuthController.logout,
);
router.post(
    '/reset-password',
    auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.customer),
    validateRequest(AuthValidations.resetPassword),
    AuthController.resetPassword,
);
export const AuthRoutes = router;
