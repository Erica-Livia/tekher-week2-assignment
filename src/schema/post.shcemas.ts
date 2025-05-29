import { z } from "zod";
import { contentSchema, idParamSchema, titleSchema } from "./common.schemas";
import { UpdateDateColumn } from "typeorm";

export const createPostSchema = z.object({
  body: z.object({
    title: titleSchema,
    content: contentSchema,
  }),
});

export const updatePostSchema = z.object({
    body: z.object({
        title: titleSchema.optional(),
        content: contentSchema.optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: "Update at least one field"
    }),
})

export const getPostByIdSchema = z.object({
    params: idParamSchema,
})


export type CreatePost = z.infer<typeof createPostSchema>;
export type UpdatePost = z.infer<typeof updatePostSchema>;
export type GetPostById = z.infer<typeof getPostByIdSchema>;