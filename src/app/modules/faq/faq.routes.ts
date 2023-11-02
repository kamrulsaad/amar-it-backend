import { USER_ROLE } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FaqController } from './faq.controller';
import { FaqValidation } from './faq.validation';

const router = express.Router();

router.post(
    '/',
    validateRequest(FaqValidation.createFaqZodSchema),
    auth(USER_ROLE.admin, USER_ROLE.super_admin),
    FaqController.insertIntoDB,
);

router.get('/', FaqController.getAllFromDB);
router
    .route('/:id')
    .get(FaqController.getByIdFromDB)
    .patch(
        validateRequest(FaqValidation.updateFaqZodSchema),
        auth(USER_ROLE.admin, USER_ROLE.super_admin),
        FaqController.updateIntoDB,
    )
    .delete(
        auth(USER_ROLE.admin, USER_ROLE.super_admin),
        FaqController.deleteFromDB,
    );

export const FaqRoute = router;
