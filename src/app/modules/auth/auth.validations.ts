import { z } from 'zod';

const signUpSchema = z.object({
  body: z.object(
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
  ),
});

export const AuthValidations = {
  signUpSchema,
};
