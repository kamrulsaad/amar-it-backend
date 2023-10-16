import { z } from 'zod';

const createBlogZodSchema = z.object({
    title: z.string({
        required_error: 'Title is required',
    }),
    content: z.string({
        required_error: 'Content is required',
    }),
    blogCategoryId: z.string({
        required_error: 'Blog Category is required',
    }),
});

const updateBlogZodSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    blogCategoryId: z.string().optional(),
});

export const BlogValidation = {
    createBlogZodSchema,
    updateBlogZodSchema,
};
