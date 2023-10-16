import { USER_ROLE } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogCategoryController } from './blog-category.controller';
import { BlogCategoryValidation } from './blog-category.validation';

const router = express.Router();

router.post(
    '/',
    validateRequest(BlogCategoryValidation.createBlogCategoryZodSchema),
    auth(USER_ROLE.admin),
    BlogCategoryController.insertIntoDB,
);

router.get('/', BlogCategoryController.getAllFromDB);
router
    .route('/:id')
    .get(BlogCategoryController.getByIdFromDB)
    .patch(
        validateRequest(BlogCategoryValidation.updateBlogCategoryZodSchema),
        auth(USER_ROLE.admin),
        BlogCategoryController.updateIntoDB,
    )
    .delete(auth(USER_ROLE.admin), BlogCategoryController.deleteFromDB);

export const BlogCategoryRoute = router;
