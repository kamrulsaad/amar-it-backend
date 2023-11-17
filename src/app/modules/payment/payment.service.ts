import { Payments } from '@prisma/client';
import httpStatus from 'http-status';
import Stripe from 'stripe';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const stripe = new Stripe(config.stripe_secret_key as string);

const insertIntoDB = async (data: {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    stripeToken: any;
    totalPrice: number;
    username: string;
}): Promise<Payments | null> => {
    const { stripeToken, totalPrice, username } = data;

    const result = await prisma.$transaction(
        async tx => {
            const user = await tx.customer.findUnique({
                where: {
                    username,
                },
            });
            if (!user) {
                throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
            }
            const params: Stripe.CustomerCreateParams = {
                description: 'Customer for a payment',
                source: stripeToken.id,
                email: stripeToken.email,
            };
            const customer = await stripe.customers.create(params);
            const payment = await stripe.charges.create({
                amount: totalPrice * 100,
                currency: 'usd',
                customer: customer.id,
                description: `Payment for ${user.username} || ${customer.id} for ${totalPrice} USD `,
            });
            if (!payment) {
                throw new ApiError(httpStatus.BAD_REQUEST, 'Payment failed');
            }

            return await tx.payments.create({
                data: {
                    totalPrice: payment.amount / 100,
                    isPaid: true,
                    paymentID: payment.id,
                    customerId: user.id,
                },
            });
        },
        { timeout: 10000 },
    );
    return result;
};

export const PaymentService = {
    insertIntoDB,
};
