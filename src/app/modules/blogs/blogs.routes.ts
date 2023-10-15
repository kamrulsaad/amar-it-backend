import express, { NextFunction, Request, Response } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import { BlogController } from './blogs.controller';
import { BlogValidation } from './blogs.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = BlogValidation.createBlogZodSchema.parse(
      JSON.parse(req.body.data),
    );
    return BlogController.insertIntoDB(req, res, next);
  },
);

router.get('/', BlogController.getAllFromDB);
router
  .route('/:id')
  .get(BlogController.getByIdFromDB)
  .patch(
    auth(ENUM_USER_ROLE.ADMIN),
    FileUploadHelper.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = BlogValidation.updateBlogZodSchema.parse(
        JSON.parse(req.body.data),
      );
      return BlogController.updateIntoDB(req, res, next);
    },
  )
  .delete(auth(ENUM_USER_ROLE.ADMIN), BlogController.deleteFromDB);

export const BlogsRoute = router;
