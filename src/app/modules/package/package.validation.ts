import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    bandwidth: z.string({
      required_error: 'Bandwidth is required',
    }),
    features: z.array(z.string(), {
      required_error: 'Features is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    rate: z.number({
      required_error: 'Rate is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    bandwidth: z.string().optional(),
    features: z.array(z.string()).optional(),
    price: z.number().optional(),
    rate: z.number().optional(),
  }),
});

export const PackageValidation = {
  create,
  update,
};
