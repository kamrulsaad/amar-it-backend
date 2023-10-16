import { USER_ROLE } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PermissionController } from './permission.controller';
import { PermissionValidation } from './permission.validation';
const router = express.Router();

router.get('/', PermissionController.getAllFromDB);

router.get('/:id', PermissionController.getSingleFromDB);

router.post(
    '/',
    auth(USER_ROLE.super_admin, USER_ROLE.admin),
    validateRequest(PermissionValidation.create),
    PermissionController.insertIntoDB,
);

router.patch(
    '/:id',
    auth(USER_ROLE.super_admin, USER_ROLE.admin),
    validateRequest(PermissionValidation.update),
    PermissionController.updateOneInDB,
);

router.delete(
    '/:id',
    auth(USER_ROLE.super_admin, USER_ROLE.admin),
    PermissionController.deleteOneFromDB,
);

export const PermissionRoutes = router;
