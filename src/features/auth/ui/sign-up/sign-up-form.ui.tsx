'use client';

import { MultiForm } from '@/features/multi-form/ui';
import { Placeholder } from '@/shared/ui/placeholder';
import {
  AcademicCapIcon,
  MapPinIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { addToast } from '@heroui/react';
import dynamic from 'next/dynamic';
import React from 'react';
import { signUp } from '../../actions';
import { signUpSchema } from '../../lib/validations/sign-up.validation';
import type { SignUpVariables } from '../../types';

const IdentityInformationForm = dynamic(
  async () =>
    await import('./identity-information-form.ui').then(
      (res) => res.IdentityInformationForm
    ),
  {
    ssr: false,
    loading: () => <p className="text-center">لطفا صبر کنید...</p>,
  }
);

const AddressInformationForm = dynamic(
  async () =>
    await import('./address-information-form.ui').then(
      (res) => res.AddressInformationForm
    ),
  {
    ssr: false,
    loading: () => <p className="text-center">لطفا صبر کنید...</p>,
  }
);

const EducationInformationForm = dynamic(
  async () =>
    await import('./education-information-form.ui').then(
      (res) => res.EducationInformationForm
    ),
  {
    ssr: false,
    loading: () => <p className="text-center">لطفا صبر کنید...</p>,
  }
);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SignUpFormProps {}

export const SignUpForm: React.FC<SignUpFormProps> = () => {
  const handleSubmit = async (data: object) => {
    const formData = new FormData();

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key as keyof typeof data];
        formData.set(key, JSON.stringify(value));
      }
    }
    const response = await signUp(undefined, formData);

    addToast({ title: response.message, color: 'danger' });
  };

  return (
    <MultiForm
      defaultValues={{} as SignUpVariables}
      stepFields={['person', 'address', 'university']}
      validationSchema={signUpSchema}
      onSubmit={handleSubmit}
    >
      <MultiForm.Steps stepsLabel="ثبت نام در سامانه دانشجویی بهزیستی">
        <MultiForm.Step stepLabel="اطلاعات هویتی">
          <Placeholder
            header="اطلاعات هویتی"
            description="این بخش برای ثبت و تأیید اطلاعات هویتی شما طراحی شده است. لطفاً اطلاعات دقیق خود را وارد کنید."
          >
            <UserIcon className="h-32 w-32" />
          </Placeholder>

          <IdentityInformationForm />
        </MultiForm.Step>

        <MultiForm.Step stepLabel="اطلاعات آدرس">
          <Placeholder
            header="اطلاعات آدرس"
            description=" لطفاً آدرس دقیق و کامل خود را شامل استان، شهرستان، بخش، شهر یا روستا، خیابان و پلاک وارد نمایید تا در صورت نیاز بتوانیم با شما تماس بگیریم یا خدمات را به درستی ارائه دهیم."
          >
            <MapPinIcon className="h-32 w-32" />
          </Placeholder>

          <AddressInformationForm />
        </MultiForm.Step>

        <MultiForm.Step stepLabel="اطلاعات تحصیلی">
          <Placeholder
            header="اطلاعات تحصیلی"
            description="لطفاً اطلاعات مربوط به مقطع تحصیلی فعلی خود، شامل شماره دانشجویی، تاریخ قبولی دانشگاه، رشته تحصیلی و دانشگاه محل تحصیل را وارد نمایید."
          >
            <AcademicCapIcon className="h-32 w-32" />
          </Placeholder>

          <EducationInformationForm />
        </MultiForm.Step>
      </MultiForm.Steps>

      <MultiForm.StepNavigation />
    </MultiForm>
  );
};
