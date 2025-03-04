import { z } from 'zod';

export const credentialsSchema = z.object({
  username: z.string().min(1, 'نام کاربری الزامی است'),
  password: z.string().min(5, 'رمز عبور باید حداقل ۵ کاراکتر باشد'),
});

export type Credentials = z.infer<typeof credentialsSchema>;

export const passwordResetRequestSchema = z.object({
  username: z.string().min(1, 'نام کاربری الزامی است'),
});

export type PasswordResetRequest = z.infer<typeof passwordResetRequestSchema>;
