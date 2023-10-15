import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '@prisma/client';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { CustomerController } from './customer.controller';
import { CustomerValidation } from './customer.validation';
const router = express.Router();

router.get('/', CustomerController.getAllFromDB);

router
  .route('/:id')
  .get(CustomerController.getSingleFromDB)
  .patch(
    auth(USER_ROLE.admin, USER_ROLE.super_admin),
    FileUploadHelper.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = CustomerValidation.update.parse(JSON.parse(req.body.data));
      return CustomerController.updateOneInDB(req, res, next);
    },
  )
  .delete(
    auth(USER_ROLE.admin, USER_ROLE.super_admin),
    CustomerController.deleteFromDB,
  );

export const CustomerRoutes = router;
