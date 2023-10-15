import express, { NextFunction, Request, Response } from 'express';
const router = express.Router();
import { UserController } from './user.controller';
// import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';

router.post(
  '/create-admin',
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createAdminSchema.parse(
      JSON.parse(req.body.data),
    );
    return UserController.createAdmin(req, res, next);
  },
);

export const UserRoutes = router;
