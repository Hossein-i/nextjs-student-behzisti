'use client';
import { useMutation } from '@apollo/client/react';
import { addToast, AutocompleteItem, Button, Form, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';

import {
  fullEducationLevelSchema,
  type FullEducationLevel,
} from '../schemas/education-level.schema';

import {
  CountiesAutocomplete,
  ProvincesAutocomplete,
} from '@/features/address/ui';
import {
  UniversityDepartmentsAutocomplete,
  UniversityLevelGroupsAutocomplete,
  UniversityLevelsAutocomplete,
  UniversityLevelSubGroupsAutocomplete,
  UniversityMajorsAutocomplete,
  UniversityTypesAutocomplete,
} from '@/features/university/ui';
import {
  majorDocument,
  MajorMutation,
  MajorMutationVariables,
} from '@/shared/api/graphql';

export interface EducationLevelFormProps {
  defaultValues?: Partial<FullEducationLevel>;
  isEditMode?: boolean;
}

export const EducationLevelForm: React.FC<EducationLevelFormProps> = (
  props
) => {
  const { defaultValues, isEditMode } = props;

  const router = useRouter();

  const [majorMutation] = useMutation<MajorMutation, MajorMutationVariables>(
    majorDocument
  );
  const form = useForm<FullEducationLevel>({
    defaultValues,
    resolver: zodResolver(fullEducationLevelSchema),
    mode: 'onTouched',
  });
  const { control, formState, setValue, handleSubmit } = form;
  const { isSubmitting } = formState;

  const [temp, setTemp] = useState<Record<string, string | null>>({
    groupId: null,
    subGroupId: null,
    levelId: null,
    provinceId: null,
    countyId: null,
    typeId: null,
  });

  const onSubmit: SubmitHandler<FullEducationLevel> = async (dto) => {
    try {
      const { id, studentId, departmentId, majorId, ...rest } = dto;

      const { error, data } = await majorMutation({
        variables: {
          dto: {
            ...(isEditMode
              ? { id: parseInt(id || '0') }
              : { studentId: parseInt(studentId || '0') }),
            ...rest,
            departmentId: parseInt(departmentId),
            majorId: parseInt(majorId),
          },
        },
      });

      if (error || !data) throw new Error(error?.message);

      router.replace('/my/education');
    } catch (error) {
      const err = error as Error;
      addToast({
        title: 'خطا در ثبت مقطع تحصیلی',
        description: err.message,
        color: 'danger',
      });
    }
  };

  return (
    <Form
      className="block"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-4">
        {isEditMode && (
          <Controller
            control={control}
            name="id"
            render={({ field }) => <input type="hidden" {...field} />}
          />
        )}
        {!isEditMode && (
          <Controller
            control={control}
            name="studentId"
            render={({ field }) => <input type="hidden" {...field} />}
          />
        )}

        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <Controller
            control={control}
            name="studentNumber"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                label="شماره دانشجویی"
                className="lg:col-span-2"
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
            name="acceptanceDate"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                label="تاریخ قبولی دانشگاه"
                placeholder="xxxx/xx/xx"
                className="lg:col-span-2"
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
          <UniversityLevelGroupsAutocomplete
            label="گروه تحصیلی"
            variant="bordered"
            color="primary"
            radius="full"
            selectedKey={temp?.groupId}
            onSelectionChange={(key) => {
              setTemp((prev) => ({
                ...prev,
                groupId: key?.toString() ?? null,
                subGroupId: null,
                levelId: null,
              }));
              setValue('majorId', '');
            }}
            isDisabled={isSubmitting}
          >
            {(item) => (
              <AutocompleteItem key={item.id} textValue={item.title}>
                {item.title}
              </AutocompleteItem>
            )}
          </UniversityLevelGroupsAutocomplete>
          <UniversityLevelSubGroupsAutocomplete
            groupId={temp.groupId ?? ''}
            label="زیر گروه تحصیلی"
            variant="bordered"
            color="primary"
            radius="full"
            selectedKey={temp.subGroupId}
            onSelectionChange={(key) => {
              setTemp((prev) => ({
                ...prev,
                subGroupId: key?.toString() ?? null,
                levelId: null,
              }));
              setValue('majorId', '');
            }}
            isReadOnly={!temp.groupId}
            isDisabled={isSubmitting}
          >
            {(item) => (
              <AutocompleteItem key={item.id} textValue={item.title}>
                {item.title}
              </AutocompleteItem>
            )}
          </UniversityLevelSubGroupsAutocomplete>
          <UniversityLevelsAutocomplete
            subGroupId={temp.subGroupId ?? ''}
            label="مقطع تحصیلی"
            variant="bordered"
            color="primary"
            radius="full"
            selectedKey={temp.levelId}
            onSelectionChange={(key) => {
              setTemp((prev) => ({
                ...prev,
                levelId: key?.toString() ?? null,
              }));
              setValue('majorId', '');
            }}
            isReadOnly={!temp.subGroupId}
            isDisabled={isSubmitting}
          >
            {(item) => (
              <AutocompleteItem key={item.id} textValue={item.title}>
                {item.title}
              </AutocompleteItem>
            )}
          </UniversityLevelsAutocomplete>
          <Controller
            control={control}
            name="majorId"
            render={({ field, fieldState: { invalid, error } }) => (
              <UniversityMajorsAutocomplete
                levelId={temp.levelId ?? ''}
                label="رشته تحصیلی"
                variant="bordered"
                color="primary"
                radius="full"
                isInvalid={invalid}
                errorMessage={error?.message}
                isReadOnly={!temp.levelId}
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
          <ProvincesAutocomplete
            label="استان"
            variant="bordered"
            color="primary"
            radius="full"
            selectedKey={temp.provinceId}
            onSelectionChange={(key) => {
              setTemp((prev) => ({
                ...prev,
                provinceId: key?.toString() ?? null,
                countyId: null,
              }));
            }}
            isDisabled={isSubmitting}
          >
            {(item) => (
              <AutocompleteItem key={item.id} textValue={item.title}>
                {item.title}
              </AutocompleteItem>
            )}
          </ProvincesAutocomplete>
          <CountiesAutocomplete
            provinceId={temp.provinceId ?? ''}
            label="شهرستان"
            variant="bordered"
            color="primary"
            radius="full"
            selectedKey={temp.countyId}
            onSelectionChange={(key) => {
              setTemp((prev) => ({
                ...prev,
                countyId: key?.toString() ?? null,
              }));
              setValue('departmentId', '');
            }}
            isReadOnly={!temp.provinceId}
            isDisabled={isSubmitting}
          >
            {(item) => (
              <AutocompleteItem key={item.id} textValue={item.title}>
                {item.title}
              </AutocompleteItem>
            )}
          </CountiesAutocomplete>
          <UniversityTypesAutocomplete
            label="نوع دانشگاه"
            variant="bordered"
            color="primary"
            radius="full"
            selectedKey={temp.typeId}
            onSelectionChange={(key) => {
              setTemp((prev) => ({
                ...prev,
                typeId: key?.toString() ?? null,
              }));
              setValue('departmentId', '');
            }}
            isDisabled={isSubmitting}
          >
            {(item) => (
              <AutocompleteItem key={item.id} textValue={item.title}>
                {item.title}
              </AutocompleteItem>
            )}
          </UniversityTypesAutocomplete>
          <Controller
            control={control}
            name="departmentId"
            render={({ field, fieldState: { invalid, error } }) => (
              <UniversityDepartmentsAutocomplete
                countyId={temp.countyId ?? ''}
                typeId={temp.typeId ?? ''}
                label="دانشگاه محل تحصیل"
                variant="bordered"
                color="primary"
                radius="full"
                isInvalid={invalid}
                errorMessage={error?.message}
                isReadOnly={!temp.countyId || !temp.typeId}
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

        <div className="flex w-full justify-end">
          <Button
            type="submit"
            color="primary"
            variant="shadow"
            radius="full"
            isLoading={isSubmitting}
          >
            {isEditMode ? 'ویرایش' : 'ثبت'}
          </Button>
        </div>
      </div>
    </Form>
  );
};
