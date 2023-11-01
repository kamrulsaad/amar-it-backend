import express from 'express';
import { ServiceController } from './service.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '@prisma/client';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidation } from './service.validation';
const router = express.Router();

router.post(
    '/',
    auth(USER_ROLE.admin),
    validateRequest(ServiceValidation.create),
    ServiceController.insertIntoDB,
);

router.get('/', ServiceController.getAllFromDB);

router
    .route('/:id')
    .get(ServiceController.getOneFromDB)
    .patch(
        auth(USER_ROLE.admin),
        validateRequest(ServiceValidation.update),
        ServiceController.updateOneInDB,
    )
    .delete(
        auth(USER_ROLE.admin),
        ServiceController.deleteOneFromDB,
    );

export const ServiceRoutes = router;
