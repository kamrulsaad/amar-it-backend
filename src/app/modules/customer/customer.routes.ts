import { USER_ROLE } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import { CustomerController } from './customer.controller';
import { CustomerValidation } from './customer.validation';
const router = express.Router();

router.get('/', CustomerController.getAllFromDB);

router.use(
    '/:feedbackID/feedback',
    auth(USER_ROLE.customer),
    CustomerController.getCustomerFeedbackFromDB,
);

router
    .route('/:id')
    .get(CustomerController.getSingleFromDB)
    .patch(
        auth(USER_ROLE.admin, USER_ROLE.super_admin),
        FileUploadHelper.upload.single('file'),
        (req: Request, res: Response, next: NextFunction) => {
            req.body = CustomerValidation.update.parse(
                JSON.parse(req.body.data),
            );
            return CustomerController.updateOneInDB(req, res, next);
        },
    )
    .delete(
        auth(USER_ROLE.admin, USER_ROLE.super_admin),
        CustomerController.deleteFromDB,
    );

export const CustomerRoutes = router;
