'use client';

import { AutocompleteItem, Input } from '@heroui/react';
import React from 'react';
import { Controller } from 'react-hook-form';

import {
  CountiesAutocomplete,
  ProvincesAutocomplete,
} from '@/features/address/ui';
import { useMultiFormContext } from '@/features/multi-form/lib/hooks';
import {
  UniversityDepartmentsAutocomplete,
  UniversityLevelGroupsAutocomplete,
  UniversityLevelSubGroupsAutocomplete,
  UniversityLevelsAutocomplete,
  UniversityMajorsAutocomplete,
  UniversityTypesAutocomplete,
} from '@/features/university/ui';
import { SignUpMutationVariables } from '@/shared/api/graphql';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EducationInformationFormProps {}

export const EducationInformationForm: React.FC<
  EducationInformationFormProps
> = () => {
  const { form } = useMultiFormContext<SignUpMutationVariables['dto']>();
  const { control, watch, setValue, formState } = form;
  const { isSubmitting } = formState;

  const hasGroup = !!watch('university.Group');
  const hasSubGroup = !!watch('university.SubGroup');
  const hasLevel = !!watch('university.Level');
  const hasProvince = !!watch('university.Province');
  const hasCounty = !!watch('university.County');
  const hasType = !!watch('university.Type');

  return (
    <div className="space-y-2">
      <Controller
        control={control}
        name="university.studentNumber"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            label="شماره دانشجویی"
            inputMode="decimal"
            variant="bordered"
            color="primary"
            radius="full"
            isInvalid={invalid}
            errorMessage={error?.message}
            isDisabled={isSubmitting}
            isRequired
            autoFocus
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="university.UniversityAcceptanceDate"
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            label="تاریخ قبولی دانشگاه"
            placeholder="xxxx/xx/xx"
            variant="bordered"
            color="primary"
            radius="full"
            isInvalid={invalid}
            errorMessage={error?.message}
            isDisabled={isSubmitting}
            isRequired
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="university.Group"
        render={({ field, fieldState: { invalid, error } }) => (
          <UniversityLevelGroupsAutocomplete
            label="گروه تحصیلی"
            variant="bordered"
            color="primary"
            radius="full"
            isInvalid={invalid}
            errorMessage={error?.message}
            isDisabled={isSubmitting}
            isRequired
            {...field}
            selectedKey={field.value}
            onSelectionChange={(key) => {
              field.onChange(key);
              setValue('university.SubGroup', '');
              setValue('university.Level', '');
              setValue('university.major', '');
            }}
          >
            {(item) => (
              <AutocompleteItem key={item.id} textValue={item.title}>
                {item.title}
              </AutocompleteItem>
            )}
          </UniversityLevelGroupsAutocomplete>
        )}
      />
      <Controller
        control={control}
        name="university.SubGroup"
        render={({ field, fieldState: { invalid, error } }) => (
          <UniversityLevelSubGroupsAutocomplete
            groupId={watch('university.Group')}
            label="زیر گروه تحصیلی"
            variant="bordered"
            color="primary"
            radius="full"
            isInvalid={invalid}
            errorMessage={error?.message}
            isReadOnly={!hasGroup}
            isDisabled={isSubmitting}
            isRequired
            {...field}
            selectedKey={field.value}
            onSelectionChange={(key) => {
              field.onChange(key);
              setValue('university.Level', '');
              setValue('university.major', '');
            }}
          >
            {(item) => (
              <AutocompleteItem key={item.id} textValue={item.title}>
                {item.title}
              </AutocompleteItem>
            )}
          </UniversityLevelSubGroupsAutocomplete>
        )}
      />
      <Controller
        control={control}
        name="university.Level"
        render={({ field, fieldState: { invalid, error } }) => (
          <UniversityLevelsAutocomplete
            subGroupId={watch('university.SubGroup')}
            label="مقطع تحصیلی"
            variant="bordered"
            color="primary"
            radius="full"
            isInvalid={invalid}
            errorMessage={error?.message}
            isReadOnly={!hasSubGroup}
            isDisabled={isSubmitting}
            isRequired
            {...field}
            selectedKey={field.value}
            onSelectionChange={(key) => {
              field.onChange(key);
              setValue('university.major', '');
            }}
          >
            {(item) => (
              <AutocompleteItem key={item.id} textValue={item.title}>
                {item.title}
              </AutocompleteItem>
            )}
          </UniversityLevelsAutocomplete>
        )}
      />
      <Controller
        control={control}
        name="university.major"
        render={({ field, fieldState: { invalid, error } }) => (
          <UniversityMajorsAutocomplete
            levelId={watch('university.Level')}
            label="رشته تحصیلی"
            variant="bordered"
            color="primary"
            radius="full"
            isInvalid={invalid}
            errorMessage={error?.message}
            isReadOnly={!hasLevel}
            isDisabled={isSubmitting}
            isRequired
            {...field}
            selectedKey={field.value}
            onSelectionChange={field.onChange}
          >
            {(item) => (
              <AutocompleteItem key={item.id} textValue={item.title}>
                {item.title}
              </AutocompleteItem>
            )}
          </UniversityMajorsAutocomplete>
        )}
      />
      <Controller
        control={control}
        name="university.Province"
        render={({ field, fieldState: { invalid, error } }) => (
          <ProvincesAutocomplete
            label="استان"
            variant="bordered"
            color="primary"
            radius="full"
            isInvalid={invalid}
            errorMessage={error?.message}
            isDisabled={isSubmitting}
            isRequired
            {...field}
            selectedKey={field.value}
            onSelectionChange={(key) => {
              field.onChange(key);
              setValue('university.County', '');
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
        name="university.County"
        render={({ field, fieldState: { invalid, error } }) => (
          <CountiesAutocomplete
            provinceId={watch('university.Province')}
            label="شهرستان"
            variant="bordered"
            color="primary"
            radius="full"
            isInvalid={invalid}
            errorMessage={error?.message}
            isReadOnly={!hasProvince}
            isDisabled={isSubmitting}
            isRequired
            {...field}
            selectedKey={field.value}
            onSelectionChange={(key) => {
              field.onChange(key);
              setValue('university.department', '');
            }}
          >
            {(item) => (
              <AutocompleteItem key={item.id} textValue={item.title}>
                {item.title}
              </AutocompleteItem>
            )}
          </CountiesAutocomplete>
        )}
      />
      <Controller
        control={control}
        name="university.Type"
        render={({ field, fieldState: { invalid, error } }) => (
          <UniversityTypesAutocomplete
            label="نوع دانشگاه"
            variant="bordered"
            color="primary"
            radius="full"
            isInvalid={invalid}
            errorMessage={error?.message}
            isDisabled={isSubmitting}
            isRequired
            {...field}
            selectedKey={field.value}
            onSelectionChange={(key) => {
              field.onChange(key);
              setValue('university.department', '');
            }}
          >
            {(item) => (
              <AutocompleteItem key={item.id} textValue={item.title}>
                {item.title}
              </AutocompleteItem>
            )}
          </UniversityTypesAutocomplete>
        )}
      />
      <Controller
        control={control}
        name="university.department"
        render={({ field, fieldState: { invalid, error } }) => (
          <UniversityDepartmentsAutocomplete
            countyId={watch('university.County')}
            typeId={watch('university.Type')}
            label="دانشگاه محل تحصیل"
            variant="bordered"
            color="primary"
            radius="full"
            isInvalid={invalid}
            errorMessage={error?.message}
            isReadOnly={!hasCounty || !hasType}
            isDisabled={isSubmitting}
            isRequired
            {...field}
            selectedKey={field.value}
            onSelectionChange={field.onChange}
          >
            {(item) => (
              <AutocompleteItem key={item.id} textValue={item.title}>
                {item.title}
              </AutocompleteItem>
            )}
          </UniversityDepartmentsAutocomplete>
        )}
      />
    </div>
  );
};
