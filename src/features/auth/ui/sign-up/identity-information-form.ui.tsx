'use client';

import { inquiry } from '@/features/auth/actions';
import type { SignUpVariables } from '@/features/auth/types';
import { useMultiFormContext } from '@/features/multi-form/lib/hooks';
import type { InquiryQueryReturn } from '@/shared/api/graphql';
import { Caption, Subheadline } from '@/shared/ui/typography';
import { addToast, Button, Input } from '@heroui/react';
import React, { useCallback, useState, useTransition } from 'react';
import { Controller } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IdentityInformationFormProps {}

export const IdentityInformationForm: React.FC<
  IdentityInformationFormProps
> = () => {
  const [covered, setCovered] =
    useState<Array<keyof InquiryQueryReturn['folder']>>();

  const [isPending, startTransition] = useTransition();
  const { form } = useMultiFormContext<SignUpVariables>();
  const { control, watch, trigger, setValue, setError, resetField } = form;

  const isInquired =
    watch('person.firstName', '') !== '' || watch('person.lastName', '') !== '';

  const renderCovered = useCallback(
    (key: keyof InquiryQueryReturn['folder']) => {
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
    },
    []
  );

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
  };

  const submitIdentityInquiry = async () => {
    startTransition(async () => {
      try {
        const isValid = await trigger(['person.nid', 'person.birthDate'], {
          shouldFocus: true,
        });
        if (!isValid) {
          return;
        }

        const formData = new FormData();
        formData.set('nid', watch('person.nid'));
        formData.set('birthDate', watch('person.birthDate'));

        const response = await inquiry(undefined, formData);

        if (response.message || !response.data) {
          setError('person.nid', { message: response.message });
          setError('person.birthDate', { message: response.message });

          addToast({
            title: response.message,
            color: 'danger',
          });
          return;
        }

        setValue('person.firstName', response.data.user.name);
        setValue('person.lastName', response.data.user.family);

        const folder = Object.entries(response.data.folder);
        const underCoverage = folder
          .filter(
            (entry): entry is [keyof InquiryQueryReturn['folder'], number] =>
              typeof entry[1] === 'number' && entry[1] === 1
          )
          .map(([key]) => key);
        setCovered(underCoverage);
      } catch (error) {
        console.error('[submitIdentityInquiry]: ', error);
      }
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Controller
        control={control}
        name="person.nid"
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <Input
            ref={ref}
            inputMode="decimal"
            label="کد ملی"
            description="کد ملی شما نام کاربری شماست پس صحت آن را بررسی نمایید."
            variant="bordered"
            color="primary"
            radius="full"
            name={name}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            validationBehavior="aria"
            isInvalid={invalid}
            errorMessage={error?.message}
            readOnly={isInquired}
            isDisabled={isPending}
            isRequired
            autoFocus
          />
        )}
      />
      <Controller
        control={control}
        name="person.birthDate"
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <Input
            ref={ref}
            label="تاریخ تولد"
            placeholder="xxxx/xx/xx"
            variant="bordered"
            color="primary"
            radius="full"
            name={name}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            validationBehavior="aria"
            isInvalid={invalid}
            errorMessage={error?.message}
            readOnly={isInquired}
            isDisabled={isPending}
            isRequired
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
            onPress={submitIdentityInquiry}
            isLoading={isPending}
          >
            استعلام
          </Button>
        )}
      </div>
      <Controller
        key="person.firstName"
        control={control}
        name="person.firstName"
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <Input
            ref={ref}
            label="نام"
            variant="bordered"
            color="primary"
            radius="full"
            name={name}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            validationBehavior="aria"
            isInvalid={invalid}
            errorMessage={error?.message}
            isDisabled={isPending}
            isRequired
            isReadOnly
          />
        )}
      />
      <Controller
        key="person.lastName"
        control={control}
        name="person.lastName"
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <Input
            ref={ref}
            label="نام خانوادگی"
            variant="bordered"
            color="primary"
            radius="full"
            name={name}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            validationBehavior="aria"
            isInvalid={invalid}
            errorMessage={error?.message}
            isDisabled={isPending}
            isRequired
            isReadOnly
          />
        )}
      />
      <Controller
        control={control}
        name="person.cellphone"
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <Input
            ref={ref}
            inputMode="tel"
            label="شماره همراه"
            placeholder="09xxxxxxxx"
            description="رمز عبور به سامانه بعد از ثبت موفقیت امیز برای شما پیامک می شود، بنابراین از صحت شماره موبایل خود مطمئن شوید."
            variant="bordered"
            color="primary"
            radius="full"
            name={name}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            validationBehavior="aria"
            isInvalid={invalid}
            errorMessage={error?.message}
            isDisabled={isPending}
            isRequired
          />
        )}
      />

      <Subheadline>وضعیت تحت پوشش</Subheadline>
      {covered ? (
        <>
          {covered.length === 0 ? (
            <Caption className="text-foreground-400">
              شما تحت پوشش بهزیستی نیستید.
            </Caption>
          ) : (
            <ul>
              {covered.map((key) => (
                <li key={key}>
                  <Caption className="text-foreground-400">
                    {renderCovered(key)}
                  </Caption>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <Caption className="text-foreground-400">
          لطفا ابتدا استعلام بگیرید.
        </Caption>
      )}
    </div>
  );
};
