import { z } from 'zod';

const signUpSchema = z.object(
    {
        user: z.object(
            {
                username: z.string({
                    required_error: 'Username is required',
                }),
                password: z.string({
                    required_error: 'Password is required',
                }),
            },
            {
                required_error: 'User info is required',
            },
        ),
        customer: z.object(
            {
                firstName: z.string({
                    required_error: 'First name is required',
                }),
                middleName: z.string().optional(),
                lastName: z.string({
                    required_error: 'Last name is required',
                }),
                email: z
                    .string({
                        required_error: 'Email is required',
                    })
                    .email(),
                contactNo: z.string({
                    required_error: 'Contact number is required',
                }),
                address: z.string({
                    required_error: 'Address is required',
                }),
            },
            {
                required_error: 'Customer info is required',
            },
        ),
    },
    {
        required_error: 'Informations are required',
    },
);

const loginZodSchema = z.object({
    body: z.object({
        username: z.string({
            required_error: 'Username is required',
        }),
        password: z.string({
            required_error: 'Password is required',
        }),
    }),
});

const refreshToken = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});

const resetPassword = z.object({
    body: z.object({
        oldPassword: z.string({
            required_error: 'Old Password is required',
        }),
        newPassword: z.string({
            required_error: 'New Password is required',
        }),
    }),
});

export const AuthValidations = {
    signUpSchema,
    loginZodSchema,
    refreshToken,
    resetPassword,
};
