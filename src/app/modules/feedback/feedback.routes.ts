import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FeedbackValidation } from './feedback.validation';
import { FeedbacController } from './feedback.controller';
import { USER_ROLE } from '@prisma/client';

const router = express.Router({
    mergeParams: true,
});

router.post(
    '/',
    auth(USER_ROLE.customer),
    FeedbacController.insertIntoDB,
);

router.get('/', FeedbacController.getAllFromDB);
router
    .route('/:id')
    .get(FeedbacController.getSingleFromDB)
    .patch(
        validateRequest(FeedbackValidation.updateFeedbackZodSchema),
        auth(USER_ROLE.customer),
        FeedbacController.updateIntoDB,
    )
    .delete(
        auth(USER_ROLE.super_admin),
        FeedbacController.deleteFromDB,
    );

export const FeedbackRoute = router;
