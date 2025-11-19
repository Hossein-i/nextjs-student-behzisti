import { z } from 'zod';

export const baseEducationLevelSchema = z.object({
  studentNumber: z
    .string({
      message: 'شماره دانشجویی الزامی است.',
    })
    .regex(/^\d*$/, 'شماره دانشجویی حتما باید عدد باشد.')
    .min(6, 'شماره دانشجویی حداقل باید ۶ حرف باشد.'),
  acceptanceDate: z
    .string({
      message: 'تاریخ قبولی دانشگاه الزامی است.',
    })
    .regex(/^\d{4}\/\d{2}\/\d{2}$/, 'فرمت تاریخ قبولی دانشگاه اشتباه می باشد.'),
  majorId: z.string({
    message: 'رشته تحصیلی الزامی است.',
  }),
  departmentId: z.string({
    message: 'دانشگاه محل تحصیل الزامی است.',
  }),
});

export const createEducationLevelSchema = z.object({
  ...baseEducationLevelSchema.shape,
  studentId: z.string({ message: 'آیدی دانشجو الزامی است.' }),
});

export const updateEducationLevelSchema = z.object({
  ...baseEducationLevelSchema.shape,
  id: z.string({ message: 'آیدی مقطع تحصیلی الزامی است.' }),
});

export const fullEducationLevelSchema = z.object({
  ...baseEducationLevelSchema.shape,
  id: z.string({ message: 'آیدی مقطع تحصیلی الزامی است.' }).optional(),
  studentId: z.string({ message: 'آیدی دانشجو الزامی است.' }).optional(),
});

export type BaseEducationLevel = z.infer<typeof baseEducationLevelSchema>;
export type CreateEducationLevel = z.infer<typeof createEducationLevelSchema>;
export type UpdateEducationLevel = z.infer<typeof updateEducationLevelSchema>;
export type FullEducationLevel = z.infer<typeof fullEducationLevelSchema>;
