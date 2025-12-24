import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address",
  }),
  password: z.minLength(8, {
    message: "Password must be at least 8 characters long",
  }),
});

LoginSchema.parse({
  email: "test@test.com",
  password: "test",
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
