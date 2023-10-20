import { USER_ROLE } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidations } from './auth.validations';
const router = express.Router();

router.post(
    '/signup',
    // FileUploadHelper.upload.single('file'),
    AuthController.signUp,
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
