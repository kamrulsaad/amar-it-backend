import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PaymentService } from './payment.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { stripeToken, totalPrice } = req.body;
    const { username } = req.user as JwtPayload;
    const result = await PaymentService.insertIntoDB({
        stripeToken,
        totalPrice,
        username,
    });
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Payment done successfully!',
        data: result,
    });
});

export const PaymentController = {
    insertIntoDB,
};
