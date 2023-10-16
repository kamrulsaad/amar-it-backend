import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '@prisma/client';
import { PackageController } from './package.controller';
import validateRequest from '../../middlewares/validateRequest';
import { PackageValidation } from './package.validation';
const router = express.Router();

router.get('/', PackageController.getAllFromDB);

router.post(
    '/',
    auth(USER_ROLE.admin, USER_ROLE.super_admin),
    validateRequest(PackageValidation.create),
    PackageController.insertIntoDB,
);

router
    .route('/:id')
    .get(PackageController.getOneFromDB)
    .patch(
        auth(USER_ROLE.admin, USER_ROLE.super_admin),
        validateRequest(PackageValidation.update),
        PackageController.updateOneInDB,
    )
    .delete(
        auth(USER_ROLE.admin, USER_ROLE.super_admin),
        PackageController.deleteOneFromDB,
    );

export const PackageRoutes = router;
