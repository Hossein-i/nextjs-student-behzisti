'use client';

import { useLazyQuery } from '@apollo/client/react';
import { addToast, Button, Input } from '@heroui/react';
import React, { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';

import { useMultiFormContext } from '@/features/multi-form/lib/hooks';
import {
  inquiryDocument,
  InquiryQuery,
  InquiryQueryVariables,
  SignUpMutationVariables,
} from '@/shared/api/graphql';
import { Caption, Subheadline } from '@/shared/ui/typography';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IdentityInformationFormProps {}

export const IdentityInformationForm: React.FC<
  IdentityInformationFormProps
> = () => {
  const { form } = useMultiFormContext<SignUpMutationVariables['dto']>();
  const { control, watch, trigger, setValue, resetField } = form;

  const [inquiryQuery, { called, loading }] = useLazyQuery<
    InquiryQuery,
    InquiryQueryVariables
  >(inquiryDocument);

  const [covered, setCovered] =
    useState<Array<keyof InquiryQuery['getFolder'][number]>>();

  const isInquired =
    watch('person.firstName', '') !== '' || watch('person.lastName', '') !== '';

  const renderCovered = useCallback(() => {
    if (!covered)
      return (
        <ul>
          <li>
            <Caption className="text-foreground-400">
              لطفا ابتدا استعلام بگیرید.
            </Caption>
          </li>
        </ul>
      );

    const status: Array<string> = [...covered].map((key) => {
      switch (key) {
        case 'Rehab':
          return '- پرونده معلولیت دارید.';
        case 'Commision':
          return '- پرونده کمیسیون پزشکی دارید.';
        case 'RehabChild':
          return '- دارای سرپرست معلول هستید.';
        case 'Farzan':
          return '- جز فرزندان نگهداری شده در مراکز هستید.';
        case 'Emdad':
          return '- امداد بگیر هستید.';
        case 'Zanan':
          return '- زنان سرپرست خانوار هستید.';
        case 'ZananChild':
          return '- فرزند زن سرپرست خانوار هستید.';
        case 'ZananPosht':
          return '- زنان سرپرست خانوار پشت نوبت مستمری هستید.';
        case 'ZananPoshtChild':
          return '- فرزند زنان سرپرست خانوار پشت نوبت مستمری هستید.';
        case 'ZananTarkhis':
          return '- زنان سرپرست خانوار ترخیص شده از سال 91 هستید.';
        case 'ZananTarkhisChild':
          return '- فرزند زنان سرپرست خانوار ترخیص شده از سال 91 هستید.';
        case 'EmdadTakhis':
          return '- فرزندان امداد بگیر ترخیص شده در سالهای گذشته هستید.';
        default:
          return '';
      }
    });

    if (status.length < 1) {
      status.push('شما تحت پوشش بهزیستی نیستید.');
    }

    return (
      <ul>
        {status.map((item, index) => (
          <li key={`f-${index}`}>
            <Caption className="text-foreground-400">{item}</Caption>
          </li>
        ))}
      </ul>
    );
  }, [covered]);

  const resetForm = () => {
    resetField('person', {
      defaultValue: {
        birthDate: '',
        cellphone: '',
        firstName: '',
        lastName: '',
        nid: '',
      },
    });
    setCovered(undefined);
  };

  const handleInquiryQuery = async () => {
    try {
      const isValid = await trigger(['person.nid', 'person.birthDate'], {
        shouldFocus: true,
      });

      if (!isValid) {
        return;
      }

      const { error, data } = await inquiryQuery({
        variables: {
          dto: {
            nid: watch('person.nid'),
            birthDate: watch('person.birthDate'),
          },
          nid: watch('person.nid'),
        },
      });
      if (error || !data) {
        throw new Error(error?.message);
      }

      setValue('person.firstName', data.getEstelam.name || '');
      setValue('person.lastName', data.getEstelam.family || '');

      const folder = Object.entries(data.getFolder[0]);
      const underCoverage = folder
        .filter(
          (entry): entry is [keyof InquiryQuery['getFolder'][number], number] =>
            typeof entry[1] === 'number' && entry[1] === 1
        )
        .map(([key]) => key);

      setCovered(underCoverage);
    } catch {
      addToast({
        title: 'خطای استعلام',
        description: 'کد ملی یا تاریخ تولد اشتباه می باشد.',
        color: 'danger',
      });
    }
  };

  return (
    <div className="space-y-2">
      <Controller
        control={control}
        name="person.nid"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            label="کد ملی"
            description="کد ملی شما نام کاربری شماست پس صحت آن را بررسی نمایید."
            inputMode="decimal"
            variant="bordered"
            color="primary"
            radius="full"
            isInvalid={invalid}
            errorMessage={error?.message}
            readOnly={isInquired}
            isDisabled={called && loading}
            isRequired
            autoFocus
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="person.birthDate"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            label="تاریخ تولد"
            placeholder="xxxx/xx/xx"
            variant="bordered"
            color="primary"
            radius="full"
            isInvalid={invalid}
            errorMessage={error?.message}
            readOnly={isInquired}
            isDisabled={called && loading}
            isRequired
            {...field}
          />
        )}
      />
      <div className="flex justify-end">
        {isInquired ? (
          <Button
            variant="bordered"
            color="primary"
            radius="full"
            onPress={resetForm}
          >
            استعلام مجدد
          </Button>
        ) : (
          <Button
            variant="shadow"
            color="primary"
            radius="full"
            onPress={handleInquiryQuery}
            isLoading={called && loading}
          >
            استعلام
          </Button>
        )}
      </div>
      <Controller
        key="person.firstName"
        control={control}
        name="person.firstName"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            label="نام"
            variant="bordered"
            color="primary"
            radius="full"
            isInvalid={invalid}
            errorMessage={error?.message}
            isDisabled={called && loading}
            isRequired
            isReadOnly
            {...field}
          />
        )}
      />
      <Controller
        key="person.lastName"
        control={control}
        name="person.lastName"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            label="نام خانوادگی"
            variant="bordered"
            color="primary"
            radius="full"
            isInvalid={invalid}
            errorMessage={error?.message}
            isDisabled={called && loading}
            isRequired
            isReadOnly
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="person.cellphone"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            label="شماره همراه"
            placeholder="09xxxxxxxx"
            description="رمز عبور به سامانه بعد از ثبت موفقیت امیز برای شما پیامک می شود، بنابراین از صحت شماره موبایل خود مطمئن شوید."
            inputMode="tel"
            variant="bordered"
            color="primary"
            radius="full"
            isInvalid={invalid}
            errorMessage={error?.message}
            isDisabled={called && loading}
            isRequired
            {...field}
          />
        )}
      />

      <Subheadline>وضعیت تحت پوشش</Subheadline>
      {renderCovered()}
    </div>
  );
};
