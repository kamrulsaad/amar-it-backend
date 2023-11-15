import { Payments } from '@prisma/client';
import httpStatus from 'http-status';
import Stripe from 'stripe';
import { uuid } from 'uuidv4';
// import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

// const stripe_secret_key = `${config.stripe_secret_key}` as string;

const stripe = new Stripe(
    'sk_test_51OCpX2EoZ8jVom2AZhjDKzHbLSHyBf4XFjZWAf42X8QzCmTmA8xx6cBMHQhrKDKSof5L9lotLwARbkCdYNYKlVM500ZBa5GtwT',
    {
        apiVersion: '2022-11-15',
    },
);

const insertIntoDB = async (data: {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    stripeToken: any;
    totalPrice: number;
    username: string;
}): Promise<Payments | null> => {
    const { stripeToken, totalPrice, username } = data;

    const result = await prisma.$transaction(
        async tx => {
            let paymentResult = null;
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
            const payment = await stripe.charges.create(
                {
                    amount: totalPrice * 100,
                    currency: 'usd',
                    customer: customer.id,
                    receipt_email: stripeToken.email,
                },
                {
                    stripeAccount: uuid(),
                },
            );
            if (payment) {
                paymentResult = await tx.payments.create({
                    data: {
                        totalPrice: payment.amount / 100,
                        isPaid: true,
                        paymentID: payment.id,
                        customerId: user.id,
                    },
                });
            }

            return paymentResult;
        },
        { timeout: 10000 },
    );
    return result;
};

export const PaymentService = {
    insertIntoDB,
};
