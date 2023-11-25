import { z } from 'zod';

const createContatZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }),
        email: z.string({
            required_error: 'Email is required',
        }),
        subject: z.string({
            required_error: 'Subject is required',
        }),
        message: z.string({
            required_error: 'Message is required',
        }),
        phone: z.string().optional(),
    }),
});

export const ContactValidation = {
    createContatZodSchema,
};
