'use client';

import {
  CountiesAutocomplete,
  ProvincesAutocomplete,
} from '@/features/address/ui';
import type { SignUpVariables } from '@/features/auth/types';
import { useMultiFormContext } from '@/features/multi-form/lib/hooks';
import {
  UniversityDepartmentsAutocomplete,
  UniversityLevelGroupsAutocomplete,
  UniversityLevelSubGroupsAutocomplete,
  UniversityLevelsAutocomplete,
  UniversityMajorsAutocomplete,
  UniversityTypesAutocomplete,
} from '@/features/university/ui';
import { AutocompleteItem, Input } from '@heroui/react';
import React from 'react';
import { Controller } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EducationInformationFormProps {}

export const EducationInformationForm: React.FC<
  EducationInformationFormProps
> = () => {
  const { form } = useMultiFormContext<SignUpVariables>();
  const { control, watch, setValue, formState } = form;
  const { isSubmitting } = formState;

  const hasGroup = !!watch('university.Group');
  const hasSubGroup = !!watch('university.SubGroup');
  const hasLevel = !!watch('university.Level');
  const hasProvince = !!watch('university.Province');
  const hasCounty = !!watch('university.County');
  const hasType = !!watch('university.Type');

  return (
    <div className="flex flex-col gap-2">
      <Controller
        control={control}
        name="university.studentNumber"
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <Input
            ref={ref}
            label="شماره دانشجویی"
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
            isDisabled={isSubmitting}
            isRequired
            autoFocus
          />
        )}
      />
      <Controller
        control={control}
        name="university.UniversityAcceptanceDate"
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <Input
            ref={ref}
            label="تاریخ قبولی دانشگاه"
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
            isDisabled={isSubmitting}
            isRequired
          />
        )}
      />
      <Controller
        control={control}
        name="university.Group"
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <UniversityLevelGroupsAutocomplete
            ref={ref}
            label="گروه تحصیلی"
            variant="bordered"
            color="primary"
            radius="full"
            name={name}
            selectedKey={value}
            onBlur={onBlur}
            onSelectionChange={(key) => {
              onChange(key);
              setValue('university.SubGroup', '');
              setValue('university.Level', '');
              setValue('university.major', '');
            }}
            validationBehavior="aria"
            isInvalid={invalid}
            errorMessage={error?.message}
            isDisabled={isSubmitting}
            isRequired
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
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <UniversityLevelSubGroupsAutocomplete
            groupId={watch('university.Group')}
            ref={ref}
            label="زیر گروه تحصیلی"
            variant="bordered"
            color="primary"
            radius="full"
            name={name}
            selectedKey={value}
            onBlur={onBlur}
            onSelectionChange={(key) => {
              onChange(key);
              setValue('university.Level', '');
              setValue('university.major', '');
            }}
            validationBehavior="aria"
            isInvalid={invalid}
            errorMessage={error?.message}
            isReadOnly={!hasGroup}
            isDisabled={isSubmitting}
            isRequired
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
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <UniversityLevelsAutocomplete
            subGroupId={watch('university.SubGroup')}
            ref={ref}
            label="مقطع تحصیلی"
            variant="bordered"
            color="primary"
            radius="full"
            name={name}
            selectedKey={value}
            onBlur={onBlur}
            onSelectionChange={(key) => {
              onChange(key);
              setValue('university.major', '');
            }}
            validationBehavior="aria"
            isInvalid={invalid}
            errorMessage={error?.message}
            isReadOnly={!hasSubGroup}
            isDisabled={isSubmitting}
            isRequired
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
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <UniversityMajorsAutocomplete
            levelId={watch('university.Level')}
            ref={ref}
            label="رشته تحصیلی"
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
            isReadOnly={!hasLevel}
            isDisabled={isSubmitting}
            isRequired
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
              setValue('university.County', '');
            }}
            validationBehavior="aria"
            isInvalid={invalid}
            errorMessage={error?.message}
            isDisabled={isSubmitting}
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
        name="university.County"
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <CountiesAutocomplete
            provinceId={watch('university.Province')}
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
              setValue('university.department', '');
            }}
            validationBehavior="aria"
            isInvalid={invalid}
            errorMessage={error?.message}
            isReadOnly={!hasProvince}
            isDisabled={isSubmitting}
            isRequired
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
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <UniversityTypesAutocomplete
            ref={ref}
            label="نوع دانشگاه"
            variant="bordered"
            color="primary"
            radius="full"
            name={name}
            selectedKey={value}
            onBlur={onBlur}
            onSelectionChange={(key) => {
              onChange(key);
              setValue('university.department', '');
            }}
            validationBehavior="aria"
            isInvalid={invalid}
            errorMessage={error?.message}
            isDisabled={isSubmitting}
            isRequired
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
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <UniversityDepartmentsAutocomplete
            countyId={watch('university.County')}
            typeId={watch('university.Type')}
            ref={ref}
            label="دانشگاه محل تحصیل"
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
            isReadOnly={!hasCounty || !hasType}
            isDisabled={isSubmitting}
            isRequired
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
