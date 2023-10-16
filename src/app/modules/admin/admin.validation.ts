import { z } from 'zod';

const update = z.object({
    firstName: z.string().optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
});

export const AdminValidation = {
    update,
};
