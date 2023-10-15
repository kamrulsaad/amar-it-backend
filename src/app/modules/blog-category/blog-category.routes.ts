import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogCategoryValidation } from './blog-category.validation';
import { BlogCategoryController } from './blog-category.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(BlogCategoryValidation.createBlogCategoryZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  BlogCategoryController.insertIntoDB,
);

router.get('/', BlogCategoryController.getAllFromDB);
router
  .route('/:id')
  .get(BlogCategoryController.getByIdFromDB)
  .patch(
    validateRequest(BlogCategoryValidation.updateBlogCategoryZodSchema),
    auth(ENUM_USER_ROLE.ADMIN),
    BlogCategoryController.updateIntoDB,
  )
  .delete(auth(ENUM_USER_ROLE.ADMIN), BlogCategoryController.deleteFromDB);

export const BlogCategoryRoute = router;
