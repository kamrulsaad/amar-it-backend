import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ContactService } from './contact.service';

const contactEmail = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await ContactService.contactEmail(payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Email Send Successfully',
        data: result,
    });
});

export const ContactController = {
    contactEmail,
};
