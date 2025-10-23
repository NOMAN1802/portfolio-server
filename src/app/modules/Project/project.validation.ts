
import { z } from "zod";

const createProjectSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(500),
    category: z.enum(["frontend", "fullstack"]),
    images: z.string().optional(),
    projectDetails: z.string().min(1).optional(),
    gitLink: z.string().optional(),
    liveLink: z.string().optional(),
     
  }),
});

const updateProjectSchema = z.object({
    body: z.object({
      title: z.string().min(1).max(500).optional(),
      category: z.enum(["frontend", "fullstack"]).optional(),
      images: z.array(z.string()).optional(),
      projectDetails: z.string().min(1).optional(),
      gitLink: z.string().optional(),
      liveLink: z.string().optional(),
       
    }),
  });


export const projectValidations = {
    createProjectSchema,
    updateProjectSchema
};
