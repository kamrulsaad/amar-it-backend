import { z } from 'zod';

const createHomeBannerZodSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  content: z.string({
    required_error: 'Content is required',
  }),
});

const updateHomeBannerZodSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export const HomeBannerValidation = {
  createHomeBannerZodSchema,
  updateHomeBannerZodSchema,
};
