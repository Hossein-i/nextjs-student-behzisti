'use client';

import { AutocompleteItem, Input } from '@heroui/react';
import React from 'react';
import { Controller } from 'react-hook-form';

import {
  CountiesAutocomplete,
  DistrictsAutocomplete,
  ProvincesAutocomplete,
  SubDistrictsAutocomplete,
} from '@/features/address/ui';
import { useMultiFormContext } from '@/features/multi-form/lib/hooks';
import { SignUpMutationVariables } from '@/shared/api/graphql';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AddressInformationFormProps {}

export const AddressInformationForm: React.FC<
  AddressInformationFormProps
> = () => {
  const { form } = useMultiFormContext<SignUpMutationVariables['dto']>();
  const { control, watch, setValue } = form;

  const hasProvince = !!watch('address.province');
  const hasCounty = !!watch('address.county');
  const hasDeviation = !!watch('address.deviation');

  return (
    <div className="space-y-2">
      <Controller
        control={control}
        name="address.province"
        render={({ field, fieldState: { invalid, error } }) => (
          <ProvincesAutocomplete
            label="استان"
            variant="bordered"
            color="primary"
            radius="full"
            isInvalid={invalid}
            errorMessage={error?.message}
            isRequired
            {...field}
            selectedKey={field.value}
            onSelectionChange={(key) => {
              field.onChange(key);
              setValue('address.county', '');
              setValue('address.deviation', '');
              setValue('address.subDeviation', '');
            }}
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
        render={({ field, fieldState: { invalid, error } }) => (
          <CountiesAutocomplete
            provinceId={watch('address.province')}
            label="شهرستان"
            variant="bordered"
            color="primary"
            radius="full"
            isInvalid={invalid}
            errorMessage={error?.message}
            isReadOnly={!hasProvince}
            isRequired
            {...field}
            selectedKey={field.value}
            onSelectionChange={(key) => {
              field.onChange(key);
              setValue('address.deviation', '');
              setValue('address.subDeviation', '');
            }}
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
        render={({ field, fieldState: { invalid, error } }) => (
          <DistrictsAutocomplete
            countyId={watch('address.county')}
            label="بخش"
            variant="bordered"
            color="primary"
            radius="full"
            isInvalid={invalid}
            errorMessage={error?.message}
            isReadOnly={!hasCounty}
            isRequired
            {...field}
            selectedKey={field.value}
            onSelectionChange={(key) => {
              field.onChange(key);
              setValue('address.subDeviation', '');
            }}
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
        render={({ field, fieldState: { invalid, error } }) => (
          <SubDistrictsAutocomplete
            deviationId={watch('address.deviation')}
            label="شهر یا روستا"
            variant="bordered"
            color="primary"
            radius="full"
            isInvalid={invalid}
            errorMessage={error?.message}
            isReadOnly={!hasDeviation}
            isRequired
            {...field}
            selectedKey={field.value}
            onSelectionChange={field.onChange}
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
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            label="آدرس کامل"
            variant="bordered"
            color="primary"
            radius="full"
            isInvalid={invalid}
            errorMessage={error?.message}
            isRequired
            {...field}
          />
        )}
      />
    </div>
  );
};
