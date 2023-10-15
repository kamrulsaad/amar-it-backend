import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FaqValidation } from './faq.validation';
import { FaqController } from './faq.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(FaqValidation.createFaqZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  FaqController.insertIntoDB,
);

router.get('/', FaqController.getAllFromDB);
router
  .route('/:id')
  .get(FaqController.getByIdFromDB)
  .patch(
    validateRequest(FaqValidation.updateFaqZodSchema),
    auth(ENUM_USER_ROLE.ADMIN),
    FaqController.updateIntoDB,
  )
  .delete(auth(ENUM_USER_ROLE.ADMIN), FaqController.deleteFromDB);

export const FaqRoute = router;
