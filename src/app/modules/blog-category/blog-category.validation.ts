import { z } from 'zod';

const createBlogCategoryZodSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required',
        }),
    }),
});

const updateBlogCategoryZodSchema = z.object({
    body: z.object({
        title: z
            .string({
                required_error: 'Title is required',
            })
            .optional(),
    }),
});

export const BlogCategoryValidation = {
    createBlogCategoryZodSchema,
    updateBlogCategoryZodSchema,
};
