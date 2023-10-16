import express, { NextFunction, Request, Response } from 'express';
import { AdminController } from './admin.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '@prisma/client';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { AdminValidation } from './admin.validation';
const router = express.Router();

router.get('/', AdminController.getAllFromDB);

router
    .route('/:id')
    .get(AdminController.getSingleFromDB)
    .patch(
        auth(USER_ROLE.admin, USER_ROLE.super_admin),
        FileUploadHelper.upload.single('file'),
        (req: Request, res: Response, next: NextFunction) => {
            req.body = AdminValidation.update.parse(JSON.parse(req.body.data));
            return AdminController.updateOneInDB(req, res, next);
        },
    )
    .delete(
        auth(USER_ROLE.admin, USER_ROLE.super_admin),
        AdminController.deleteFromDB,
    );

export const AdminRoutes = router;
