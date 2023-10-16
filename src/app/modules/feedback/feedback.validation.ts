import { z } from 'zod';

const createFeedbackZodSchema = z.object({
    body: z.object({
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
        message: z.string().optional(),
    }),
});

export const FeedbackValidation = {
    createFeedbackZodSchema,
    updateFeedbackZodSchema,
};
