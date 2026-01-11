import z from "zod";

export const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  image: z.string().url().optional(),
});

export type UserInput = z.infer<typeof userSchema>;

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  rememberMe: z.boolean().optional(),
});

export type SignInInputSchema = z.infer<typeof signInSchema>;
