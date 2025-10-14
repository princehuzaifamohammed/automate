import z from "zod";

export const loginSchema = z.object({
   email: z.email("Please provide a valid email"),
   password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signUpSchema = z
   .object({
      email: z.email("Please provide a valid email"),
      password: z.string().min(1, "Password is required"),
      confirmPassword: z.string(),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "passwords donnot match",
      path: ["confirmPassword"],
   });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
