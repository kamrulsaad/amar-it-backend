import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ContactController } from './contact.controller';
import { ContactValidation } from './contact.validation';

const router = express.Router();

router.post(
    '/',
    validateRequest(ContactValidation.createContatZodSchema),
    ContactController.contactEmail,
);

export const ContactRoute = router;
