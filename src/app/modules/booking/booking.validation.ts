import { z } from 'zod';

const create = z.object({
    body: z.object({
        startTime: z.string({
            required_error: 'Start time is required',
        }),
        endTime: z.string({
            required_error: 'End time is required',
        }),
        date: z.string({
            required_error: 'Date is required',
        }),
        packageId: z.string({
            required_error: 'Package id is required',
        }),
    }),
});

const update = z.object({
    body: z.object({
        startTime: z
            .string({
                required_error: 'Start time is required',
            })
            .optional(),
        endTime: z
            .string({
                required_error: 'End time is required',
            })
            .optional(),
        date: z.string().optional(),
        status: z.string().optional(),
        packageId: z
            .string({
                required_error: 'Package id is required',
            })
            .optional(),
    }),
});

export const BookingValidation = {
    create,
    update,
};
