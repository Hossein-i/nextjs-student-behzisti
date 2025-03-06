import {
  AcademicCapIcon as AcademicCapInactiveIcon,
  BanknotesIcon as BanknotesInactiveIcon,
  Squares2X2Icon as Squares2X2InactiveIcon,
} from '@heroicons/react/24/outline';
import {
  AcademicCapIcon as AcademicCapActiveIcon,
  BanknotesIcon as BanknotesActiveIcon,
  Squares2X2Icon as Squares2X2ActiveIcon,
} from '@heroicons/react/24/solid';
import { IconType } from './types';

export const navigationLinks: Array<{
  href: string;
  icon: { active: IconType; inactive: IconType };
  title: string;
}> = [
  {
    href: '/my/education',
    icon: {
      active: AcademicCapInactiveIcon,
      inactive: AcademicCapActiveIcon,
    },
    title: 'تحصیلات',
  },
  {
    href: '/my',
    icon: {
      active: Squares2X2InactiveIcon,
      inactive: Squares2X2ActiveIcon,
    },
    title: 'داشبورد',
  },
  {
    href: '/my/transactions',
    icon: {
      active: BanknotesInactiveIcon,
      inactive: BanknotesActiveIcon,
    },
    title: 'تراکنش‌ها',
  },
];
