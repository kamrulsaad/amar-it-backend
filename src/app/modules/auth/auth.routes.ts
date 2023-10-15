import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
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

export const AuthRoutes = router;
