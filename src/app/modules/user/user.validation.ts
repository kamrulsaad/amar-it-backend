import { z } from 'zod';

const createAdminSchema = z.object({
  body: z.object({
    user: z.object({
      username: z.string({
        required_error: 'Username is required',
      }),
      password: z.string({
        required_error: 'Password is required',
      }),
    }),
    admin: z.object({
      firstName: z.string({
        required_error: 'First Name is required',
      }),
      middleName: z.string().optional(),
      lastName: z.string({
        required_error: 'Last Name is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email({
          message: 'Invalid email format',
        }),
      contactNo: z.string({
        required_error: 'Contact No is required',
      }),
      address: z.string({
        required_error: 'Address is required',
      }),
      profileImage: z.string().optional(),
      permissionId: z.string({
        required_error: 'Permission is Required',
      }),
    }),
  }),
});

export const UserValidation = {
  createAdminSchema,
};
