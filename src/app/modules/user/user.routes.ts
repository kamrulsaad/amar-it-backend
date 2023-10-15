import express from 'express';
const router = express.Router();
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminSchema),
  UserController.createAdmin,
);

export const UserRoutes = router;
