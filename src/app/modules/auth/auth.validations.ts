import z from 'zod';

const signUpSchema = z.object({
  user: z.object({
    username: z.string({
      required_error: 'Username is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
  customer: z.object({}),
});

export default signUpSchema;
