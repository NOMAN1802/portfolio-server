import { z } from "zod";

const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(500),
    postDetails: z.string().min(1),
    category: z.enum(["Frontend", "Databas", "Backend"]), 
    image: z.string().optional(),
     
  }),
});

const updatePostSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(500).optional(),
    postDetails: z.string().min(1).optional(),
    category: z.enum(["Frontend", "Databas", "Backend"]).optional(),
    images: z.array(z.string()).optional(),
  }),
});



export const postValidations = {
  createPostSchema,
  updatePostSchema,
 
};