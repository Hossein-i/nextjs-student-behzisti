import { z } from 'zod';

export const authenticateSchema = z.object({
  username: z.string().min(1, 'نام کاربری الزامی است'),
  password: z.string().min(5, 'رمز عبور باید حداقل ۵ کاراکتر باشد'),
});

export type Authenticate = z.infer<typeof authenticateSchema>;
