import { z } from 'zod';

const create = z.object({
    body: z.object({
        startTime: z
            .string({
                required_error: 'Start time is required',
            })
            .refine(
                value => {
                    const date = new Date(value);
                    return (
                        !isNaN(date.getTime()) &&
                        value.match(/^\d{4}-\d{2}-\d{2}$/)
                    );
                },
                {
                    message:
                        'Invalid date format. Date must be in format "YYYY-MM-DD"',
                },
            ),
        endTime: z
            .string({
                required_error: 'End time is required',
            })
            .refine(
                value => {
                    const date = new Date(value);
                    return (
                        !isNaN(date.getTime()) &&
                        value.match(/^\d{4}-\d{2}-\d{2}$/)
                    );
                },
                {
                    message:
                        'Invalid date format. Date must be in format "YYYY-MM-DD"',
                },
            ),
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
            .refine(
                value => {
                    const date = new Date(value);
                    return (
                        !isNaN(date.getTime()) &&
                        value.match(/^\d{4}-\d{2}-\d{2}$/)
                    );
                },
                {
                    message:
                        'Invalid date format. Date must be in format "YYYY-MM-DD"',
                },
            )
            .optional(),
        endTime: z
            .string({
                required_error: 'End time is required',
            })
            .refine(
                value => {
                    const date = new Date(value);
                    return (
                        !isNaN(date.getTime()) &&
                        value.match(/^\d{4}-\d{2}-\d{2}$/)
                    );
                },
                {
                    message:
                        'Invalid date format. Date must be in format "YYYY-MM-DD"',
                },
            )
            .optional(),
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
