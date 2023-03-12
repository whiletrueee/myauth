import { z } from "zod";

export const registerSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(6),
});
