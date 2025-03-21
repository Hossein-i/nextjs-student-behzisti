import { z } from 'zod';

export const passwordResetRequestSchema = z.object({
  username: z.string().min(1, 'نام کاربری الزامی است'),
});

export type PasswordResetRequest = z.infer<typeof passwordResetRequestSchema>;
