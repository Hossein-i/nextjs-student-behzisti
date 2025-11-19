import { z } from 'zod';

export const signUpSchema = z.object({
  person: z.object({
    nid: z
      .string({ message: 'کد ملی الزامی است.' })
      .regex(/^\d*$/, 'کد ملی حتما باید عدد باشد.')
      .length(10, 'کد ملی حتما باید ۱۰ رقم باشد.'),
    birthDate: z
      .string({
        message: 'تاریخ تولد الزامی است.',
      })
      .regex(/^\d{4}\/\d{2}\/\d{2}$/, 'فرمت تاریخ تولد اشتباه می باشد.'),
    firstName: z
      .string({
        message: 'نام الزامی است.',
      })
      .min(2, 'نام حداقل باید ۲ حرف داشته باشد.'),
    lastName: z
      .string({
        message: 'نام خانوادگی الزامی است.',
      })
      .min(2, 'نام خانوادگی حداقل باید ۲ حرف داشته باشد.'),
    cellphone: z
      .string({
        message: 'شماره همراه الزامی است.',
      })
      .regex(/^09\d{9}$/, 'فرمت شماره همراه اشتباه می باشد.'),
  }),
  address: z.object({
    province: z.string({
      message: 'استان الزامی است.',
    }),
    county: z.string({
      message: 'شهرستان الزامی است.',
    }),
    deviation: z.string({
      message: 'بخش الزامی است.',
    }),
    subDeviation: z.string({
      message: 'شهر یا روستا الزامی است.',
    }),
    AddressLine1: z
      .string({
        message: 'آدرس کامل الزامی است.',
      })
      .min(10, 'آدرس کامل حداقل باید ۱۰ حرف باشد.'),
  }),
  university: z.object({
    studentNumber: z
      .string({
        message: 'شماره دانشجویی الزامی است.',
      })

      .regex(/^\d*$/, 'شماره دانشجویی حتما باید عدد باشد.')
      .min(6, 'شماره دانشجویی حداقل باید ۶ حرف باشد.'),
    UniversityAcceptanceDate: z
      .string({
        message: 'تاریخ قبولی دانشگاه الزامی است.',
      })
      .regex(
        /^\d{4}\/\d{2}\/\d{2}$/,
        'فرمت تاریخ قبولی دانشگاه اشتباه می باشد.'
      ),
    Group: z.string({
      message: 'گروه تحصیلی الزامی است.',
    }),
    SubGroup: z.string({
      message: 'زیر گروه تحصیلی الزامی است.',
    }),
    Level: z.string({
      message: 'مقطع تحصیلی الزامی است.',
    }),
    major: z.string({
      message: 'رشته تحصیلی الزامی است.',
    }),
    Province: z.string({
      message: 'استان الزامی است.',
    }),
    County: z.string({
      message: 'شهرستان الزامی است.',
    }),
    Type: z.string({
      message: 'نوع دانشگاه الزامی است.',
    }),
    department: z.string({
      message: 'دانشگاه محل تحصیل الزامی است.',
    }),
  }),
});

export type SignUp = z.infer<typeof signUpSchema>;
