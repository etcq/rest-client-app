import { validationMessages } from '@/constants/validation';
import { z } from 'zod';

export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: validationMessages.name })
    .regex(/^[A-Z]/, { message: validationMessages.nameUppercase }),
  email: z.string().min(1, { message: validationMessages.email }).email({ message: validationMessages.emailInvalid }),
  password: z
    .string()
    .min(1, { message: validationMessages.password })
    .min(8, { message: validationMessages.passwordLength })
    .regex(/[A-Z]/, { message: validationMessages.passwordUppercase })
    .regex(/[a-z]/, { message: validationMessages.passwordLowercase })
    .regex(/\d/, { message: validationMessages.passwordNumber })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: validationMessages.passwordSpecial,
    }),
});
export type SignUpInput = z.infer<typeof signUpSchema>;

export const signInSchema = signUpSchema.omit({ name: true });
export type SignInInput = z.infer<typeof signInSchema>;
