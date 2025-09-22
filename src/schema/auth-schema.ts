import { z } from 'zod';

export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'name' })
    .regex(/^[A-Z]/, { message: 'nameUppercase' }),
  email: z.string().min(1, { message: 'email' }).email({ message: 'emailInvalid' }),
  password: z
    .string()
    .min(1, { message: 'password' })
    .min(8, { message: 'passwordLength' })
    .regex(/[A-Z]/, { message: 'passwordUppercase' })
    .regex(/[a-z]/, { message: 'passwordLowercase' })
    .regex(/\d/, { message: 'passwordNumber' })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: 'passwordSpecial',
    }),
});
export type SignUpInput = z.infer<typeof signUpSchema>;

export const signInSchema = signUpSchema.omit({ name: true });
export type SignInInput = z.infer<typeof signInSchema>;
