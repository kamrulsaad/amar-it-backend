import express from 'express';
import { PermissionController } from './permission.controller';
import validateRequest from '../../middlewares/validateRequest';
import { PermissionValidation } from './permission.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(PermissionValidation.create),
  PermissionController.insertIntoDB,
);

export const PermissionRoutes = router;
