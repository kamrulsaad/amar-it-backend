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

router.delete(
  '/logout',
  auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.customer),
  AuthController.logout,
);
export const AuthRoutes = router;
