import { USER_ROLE } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { PaymentController } from './payment.controller';

const router = express.Router();

router.post('/', auth(USER_ROLE.customer), PaymentController.insertIntoDB);

export const PaymentRoutes = router;
