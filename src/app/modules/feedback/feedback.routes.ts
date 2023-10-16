import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FeedbackValidation } from './feedback.validation';
import { FaqController } from './feedback.controller';
import { USER_ROLE } from '@prisma/client';

const router = express.Router({
    mergeParams: true,
});

router.post(
    '/',
    auth(USER_ROLE.customer),
    validateRequest(FeedbackValidation.createFeedbackZodSchema),
    FaqController.insertIntoDB,
);

router.get('/', FaqController.getAllFromDB);
router
    .route('/:id')
    .get(FaqController.getSingleFromDB)
    .patch(
        validateRequest(FeedbackValidation.updateFeedbackZodSchema),
        auth(USER_ROLE.customer),
        FaqController.updateIntoDB,
    )
    .delete(auth(USER_ROLE.super_admin), FaqController.deleteFromDB);

export const FeedbackRoute = router;
