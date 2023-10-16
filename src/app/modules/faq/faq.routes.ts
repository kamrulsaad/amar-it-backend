import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FaqValidation } from './faq.validation';
import { FaqController } from './faq.controller';
import { USER_ROLE } from '@prisma/client';

const router = express.Router();

router.post(
    '/',
    validateRequest(FaqValidation.createFaqZodSchema),
    auth(USER_ROLE.super_admin, USER_ROLE.admin),
    FaqController.insertIntoDB,
);

router.get('/', FaqController.getAllFromDB);
router
    .route('/:id')
    .get(FaqController.getByIdFromDB)
    .patch(
        validateRequest(FaqValidation.updateFaqZodSchema),
        auth(USER_ROLE.super_admin, USER_ROLE.admin),
        FaqController.updateIntoDB,
    )
    .delete(
        auth(USER_ROLE.super_admin, USER_ROLE.admin),
        FaqController.deleteFromDB,
    );

export const FaqRoute = router;
