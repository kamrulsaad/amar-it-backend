import express from 'express';
import { AdminController } from './admin.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '@prisma/client';
import { AdminValidation } from './admin.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

router.get('/', AdminController.getAllFromDB);

router
    .route('/:id')
    .get(AdminController.getSingleFromDB)
    .patch(
        auth(USER_ROLE.admin, USER_ROLE.super_admin),
        validateRequest(AdminValidation.update),
        AdminController.updateOneInDB,
    )
    .delete(
        auth(USER_ROLE.admin, USER_ROLE.super_admin),
        AdminController.deleteFromDB,
    );

export const AdminRoutes = router;
