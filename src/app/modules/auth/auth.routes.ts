import { USER_ROLE } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidations } from './auth.validations';
const router = express.Router();

router.post(
    '/signup',
    validateRequest(AuthValidations.signUpSchema),
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

router.post(
    '/reset-password',
    auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.customer),
    validateRequest(AuthValidations.resetPassword),
    AuthController.resetPassword,
);
export const AuthRoutes = router;
