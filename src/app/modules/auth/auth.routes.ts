import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validations';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
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
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER,
    ENUM_USER_ROLE.SUPER_ADMIN,
  ),
  AuthController.logout,
);
export const AuthRoutes = router;
