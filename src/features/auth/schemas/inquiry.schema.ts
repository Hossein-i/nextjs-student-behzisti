import { z } from 'zod';

export const inquirySchema = z.object({
  nid: z
    .string({ message: 'کد ملی الزامی است.' })
    .length(10, 'کد ملی حتما باید ۱۰ رقم باشد.'),
  birthDate: z
    .string({
      message: 'تاریخ تولد الزامی است.',
    })
    .regex(/^\d{4}\/\d{2}\/\d{2}$/, 'فرمت تاریخ تولد اشتباه می باشد.'),
});

export type Inquiry = z.infer<typeof inquirySchema>;
