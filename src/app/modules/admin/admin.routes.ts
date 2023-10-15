import express from 'express';
import { AdminController } from './admin.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '@prisma/client';
const router = express.Router();

router.get('/', AdminController.getAllFromDB);

router
  .route('/:id')
  .get(AdminController.getSingleFromDB)
  .delete(
    auth(USER_ROLE.admin, USER_ROLE.super_admin),
    AdminController.deleteFromDB,
  );

export const AdminRoutes = router;
