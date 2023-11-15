import { z } from 'zod';

const signUpSchema = z.object({
    body: z.object({
        username: z.string({
            required_error: 'Username is required',
        }),
        password: z.string({
            required_error: 'Password is required',
        }),
    }),
});

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
