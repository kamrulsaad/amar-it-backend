import { z } from 'zod';

const createFeedbackZodSchema = z.object({
    body: z.object({
        customerId: z.string({
            required_error: 'Customer is required',
        }),
        packageId: z.string({
            required_error: 'Package is required',
        }),
        message: z.string({
            required_error: 'Message is required',
        }),
    }),
});

const updateFeedbackZodSchema = z.object({
    body: z.object({
        customerId: z
            .string({
                required_error: 'Customer is required',
            })
            .optional(),
        packageId: z
            .string({
                required_error: 'Package is required',
            })
            .optional(),
        message: z
            .string({
                required_error: 'Message is required',
            })
            .optional(),
    }),
});

export const FeedbackValidation = {
    createFeedbackZodSchema,
    updateFeedbackZodSchema,
};
