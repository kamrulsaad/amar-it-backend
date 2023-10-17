import { z } from 'zod';

const create = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required',
        }),
        description: z.string({
            required_error: 'Description is required',
        }),
        features: z.array(
            z.string({
                required_error: 'Features is required',
            }),
        ),
        charge: z.number({
            required_error: 'Charge amount is required',
        }),
        status: z.enum(['active', 'upcoming']).optional(),
    }),
});

const update = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        features: z.array(z.string()).optional(),
        charge: z.number().optional(),
        status: z.enum(['active', 'upcoming']).optional(),
    }),
});

export const ServiceValidation = {
    create,
    update,
};
