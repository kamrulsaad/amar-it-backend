import { z } from 'zod';

const createFaqZodSchema = z.object({
    body: z.object({
        question: z.string({
            required_error: 'Question is required',
        }),
        answer: z.string({
            required_error: 'Answer is required',
        }),
    }),
});

const updateFaqZodSchema = z.object({
    body: z.object({
        question: z
            .string({
                required_error: 'Question is required',
            })
            .optional(),
        answer: z
            .string({
                required_error: 'Answer is required',
            })
            .optional(),
    }),
});

export const FaqValidation = {
    createFaqZodSchema,
    updateFaqZodSchema,
};
