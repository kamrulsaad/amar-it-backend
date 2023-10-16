import { USER_ROLE } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';
const router = express.Router();

router.post(
    '/',
    auth(USER_ROLE.customer),
    validateRequest(BookingValidation.create),
    BookingController.insertIntoDB,
);

router.get(
    '/',
    auth(USER_ROLE.admin, USER_ROLE.super_admin),
    BookingController.getAllFromDB,
);

router
    .route('/:id')
    .get(BookingController.getSingleFromDB)
    .patch(
        auth(USER_ROLE.admin, USER_ROLE.super_admin),
        validateRequest(BookingValidation.update),
        BookingController.updateInDB,
    )
    .delete(
        auth(USER_ROLE.admin, USER_ROLE.super_admin),
        BookingController.deleteFromDB,
    );

export const BookingRoutes = router;
