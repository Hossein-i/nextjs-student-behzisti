import { z } from 'zod';

export const baseTermsByEducationLevelSchema = z.object({
  detail: z.string({
    message: 'الزامی است.',
  }),
  year: z.string({
    message: 'سال تحصیلی الزامی است.',
  }),
  semister: z
    .string({
      message: 'نیم سال تحصیلی الزامی است.',
    })
    .regex(/^[1-3]$/, 'نیم سال تحصیلی باید بین ۱ الی ۳ باشد.'),
  unit: z
    .number({
      message: 'تعداد واحد الزامی است.',
    })
    .min(8, 'تعداد واحد باید حداقل ۸ باشد.')
    .max(24, 'تعداد واحد باید حداکثر ۲۴ باشد.'),
  cost: z.object({
    fixed: z.number({
      message: 'شهریه ثابت الزامی است.',
    }),
    variable: z.number({
      message: 'شهریه متغیر الزامی است.',
    }),
    total: z.number({
      message: 'شهریه کل الزامی است.',
    }),
  }),
  account: z.object({
    number: z
      .string({
        message: 'شماره حساب الزامی است.',
      })
      .regex(/\d+/, 'شماره حساب معتبر نیست.'),
    IBN: z
      .string({
        message: 'شماره شبا الزامی است.',
      })
      .regex(/^(IR|ir)[0-9]{24}$/, 'شماره شبا معتبر نیست.'),
    CARD: z
      .string({
        message: 'شماره کارت الزامی است.',
      })
      .regex(/^\d+$/, 'شماره کارت معتبر نیست.')
      .length(16, 'شماره کارت باید ۱۶ رقم باشد.'),
  }),
  images: z
    .array(z.instanceof(File), {
      message: 'تصاویر الزامی است.',
    })
    .length(3, 'فقط ۳ تصویر مجاز است.')
    .superRefine((files, ctx) => {
      files.forEach((file) => {
        if (!file.type.startsWith('image/')) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'فقط فایل‌های تصویری مجاز هستند.',
          });
        }
        if (file.size > 300 * 1024) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'حجم هر تصویر باید کمتر از 200 کیلوبایت باشد.',
          });
        }
      });
    }),
  imagesNumber: z.array(
    z.number({
      message: 'شماره فایل آپلود شده معتبر نیست.',
    }),
    {
      message: 'شماره فایل آپلود شده الزامی است.',
    }
  ),
});

export const createTermsByEducationLevelSchema = z.object({
  ...baseTermsByEducationLevelSchema.shape,
});

export const updateTermsByEducationLevelSchema = z.object({
  ...baseTermsByEducationLevelSchema.shape,
  id: z.string({ message: 'آیدی مقطع تحصیلی الزامی است.' }),
});

export const fullTermsByEducationLevelSchema = z.object({
  ...baseTermsByEducationLevelSchema.shape,
  id: z.string({ message: 'آیدی مقطع تحصیلی الزامی است.' }).optional(),
});

export type BaseTermsByEducationLevel = z.infer<
  typeof baseTermsByEducationLevelSchema
>;
export type CreateTermsByEducationLevel = z.infer<
  typeof createTermsByEducationLevelSchema
>;
export type UpdateTermsByEducationLevel = z.infer<
  typeof updateTermsByEducationLevelSchema
>;
export type FullTermsByEducationLevel = z.infer<
  typeof fullTermsByEducationLevelSchema
>;
