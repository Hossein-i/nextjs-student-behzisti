'use client';

import {
  CountiesAutocomplete,
  DistrictsAutocomplete,
  ProvincesAutocomplete,
  SubDistrictsAutocomplete,
} from '@/features/address/ui';
import type { SignUpVariables } from '@/features/auth/types';
import { useMultiFormContext } from '@/features/multi-form/lib/hooks';
import { AutocompleteItem, Input } from '@heroui/react';
import React from 'react';
import { Controller } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AddressInformationFormProps {}

export const AddressInformationForm: React.FC<
  AddressInformationFormProps
> = () => {
  const { form } = useMultiFormContext<SignUpVariables>();
  const { control, watch, setValue } = form;

  const hasProvince = !!watch('address.province');
  const hasCounty = !!watch('address.county');
  const hasDeviation = !!watch('address.deviation');

  return (
    <div className="flex flex-col gap-2">
      <Controller
        control={control}
        name="address.province"
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <ProvincesAutocomplete
            ref={ref}
            label="استان"
            variant="bordered"
            color="primary"
            radius="full"
            name={name}
            selectedKey={value}
            onBlur={onBlur}
            onSelectionChange={(key) => {
              onChange(key);
              setValue('address.county', '');
              setValue('address.deviation', '');
              setValue('address.subDeviation', '');
            }}
            validationBehavior="aria"
            isInvalid={invalid}
            errorMessage={error?.message}
            isRequired
          >
            {(item) => (
              <AutocompleteItem key={item.id} textValue={item.title}>
                {item.title}
              </AutocompleteItem>
            )}
          </ProvincesAutocomplete>
        )}
      />
      <Controller
        control={control}
        name="address.county"
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <CountiesAutocomplete
            provinceId={watch('address.province')}
            ref={ref}
            label="شهرستان"
            variant="bordered"
            color="primary"
            radius="full"
            name={name}
            selectedKey={value}
            onBlur={onBlur}
            onSelectionChange={(key) => {
              onChange(key);
              setValue('address.deviation', '');
              setValue('address.subDeviation', '');
            }}
            validationBehavior="aria"
            isInvalid={invalid}
            errorMessage={error?.message}
            isReadOnly={!hasProvince}
            isRequired
          >
            {(item) => (
              <AutocompleteItem key={item.id}>{item.title}</AutocompleteItem>
            )}
          </CountiesAutocomplete>
        )}
      />
      <Controller
        control={control}
        name="address.deviation"
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <DistrictsAutocomplete
            countyId={watch('address.county')}
            ref={ref}
            label="بخش"
            variant="bordered"
            color="primary"
            radius="full"
            name={name}
            selectedKey={value}
            onBlur={onBlur}
            onSelectionChange={(key) => {
              onChange(key);
              setValue('address.subDeviation', '');
            }}
            validationBehavior="aria"
            isInvalid={invalid}
            errorMessage={error?.message}
            isReadOnly={!hasCounty}
            isRequired
          >
            {(item) => (
              <AutocompleteItem key={item.id}>{item.title}</AutocompleteItem>
            )}
          </DistrictsAutocomplete>
        )}
      />
      <Controller
        control={control}
        name="address.subDeviation"
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <SubDistrictsAutocomplete
            deviationId={watch('address.deviation')}
            ref={ref}
            label="شهر یا روستا"
            variant="bordered"
            color="primary"
            radius="full"
            name={name}
            selectedKey={value}
            onBlur={onBlur}
            onSelectionChange={onChange}
            validationBehavior="aria"
            isInvalid={invalid}
            errorMessage={error?.message}
            isReadOnly={!hasDeviation}
            isRequired
          >
            {(item) => (
              <AutocompleteItem key={item.id}>{item.title}</AutocompleteItem>
            )}
          </SubDistrictsAutocomplete>
        )}
      />
      <Controller
        control={control}
        name="address.AddressLine1"
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <Input
            ref={ref}
            label="آدرس کامل"
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
            isRequired
          />
        )}
      />
    </div>
  );
};
