import express from 'express';
const router = express.Router();
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '@prisma/client';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

router.post(
    '/create-admin',
    validateRequest(UserValidation.createAdminSchema),
    auth(USER_ROLE.super_admin),
    UserController.createAdmin,
);

export const UserRoutes = router;
