'use client';

import { useMutation } from '@apollo/client/react';
import {
  addToast,
  AutocompleteItem,
  Button,
  Form,
  Input,
  NumberInput,
  Select,
  SelectItem,
} from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';

import {
  fullTermsByEducationLevelSchema,
  type FullTermsByEducationLevel,
} from '../schemas';

import { EducationYearsAutocomplete } from './education-years';

import {
  FilePreview,
  FilesInput,
  FilesPreview,
} from '@/features/files-upload/ui';
import {
  termDocument,
  TermMutation,
  TermMutationVariables,
} from '@/shared/api/graphql';

export interface TermsByEducationLevelFormProps {
  defaultValues?: Partial<FullTermsByEducationLevel>;
  isEditMode?: boolean;
}

export const TermsByEducationLevelForm: React.FC<
  TermsByEducationLevelFormProps
> = (props) => {
  const { defaultValues, isEditMode } = props;

  const router = useRouter();

  const [termMutation] = useMutation<TermMutation, TermMutationVariables>(
    termDocument
  );

  const form = useForm<FullTermsByEducationLevel>({
    defaultValues,
    resolver: zodResolver(fullTermsByEducationLevelSchema),
    mode: 'onTouched',
  });
  const { control, formState, watch, setValue, resetField, handleSubmit } =
    form;
  const { isSubmitting } = formState;

  const [semesterItems, setSemesterItems] = useState<
    Array<{
      id: number;
      title: string;
      isEnabled?: boolean | null | undefined;
    }>
  >([]);

  const [costFixed, costVariable] = watch(['cost.fixed', 'cost.variable'], {
    cost: { fixed: 0, variable: 0 },
  });

  const onSubmit: SubmitHandler<FullTermsByEducationLevel> = async (dto) => {
    try {
      const { id, semister, ...rest } = dto;

      const { error, data } = await termMutation({
        variables: {
          dto: {
            ...(isEditMode ? { id: parseInt(id || '0') } : {}),
            ...rest,
            semister: parseInt(semister),
          },
        },
      });

      if (error || !data) throw new Error(error?.message);

      router.replace(`/my/education/${dto.detail}/terms`);
    } catch (error) {
      const err = error as Error;
      addToast({
        title: 'خطا در ثبت ترم تحصیلی',
        description: err.message,
        color: 'danger',
      });
    }
  };

  useEffect(() => {
    setValue('cost.total', Number(costFixed) + Number(costVariable));
  }, [costFixed, costVariable, setValue]);

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
        <Controller
          control={control}
          name="detail"
          render={({ field }) => <input type="hidden" {...field} />}
        />
        <Controller
          control={control}
          name="imagesNumber"
          render={({ field }) => (
            <input type="hidden" {...field} value={field.value.map(String)} />
          )}
        />
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3">
          <Controller
            control={control}
            name="year"
            render={({ field, fieldState: { invalid, error } }) => (
              <EducationYearsAutocomplete
                label="سال تحصیلی"
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
                  resetField('semister', { defaultValue: undefined });
                }}
                onSemesterChange={setSemesterItems}
              >
                {(item) => (
                  <AutocompleteItem key={item.id} textValue={item.title}>
                    {item.title}
                  </AutocompleteItem>
                )}
              </EducationYearsAutocomplete>
            )}
          />
          <Controller
            control={control}
            name="semister"
            render={({ field, fieldState: { invalid, error } }) => (
              <Select
                label="نیمسال تحصیلی"
                variant="bordered"
                color="primary"
                radius="full"
                items={semesterItems}
                isInvalid={invalid}
                errorMessage={error?.message}
                isDisabled={!watch('year') || isSubmitting}
                isRequired
                {...field}
                selectedKeys={new Set(field.value ? [field.value] : [])}
                onSelectionChange={(keys) => field.onChange(keys.currentKey)}
              >
                {(item) => (
                  <SelectItem key={item.id} textValue={item.title}>
                    {item.title}
                  </SelectItem>
                )}
              </Select>
            )}
          />
          <Controller
            control={control}
            name="unit"
            render={({
              field: { onChange, ...field },
              fieldState: { invalid, error },
            }) => (
              <NumberInput
                label="تعداد واحد"
                variant="bordered"
                color="primary"
                radius="full"
                isInvalid={invalid}
                errorMessage={error?.message}
                isDisabled={isSubmitting}
                isRequired
                hideStepper
                {...field}
                onValueChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="cost.fixed"
            render={({
              field: { onChange, ...field },
              fieldState: { invalid, error },
            }) => (
              <NumberInput
                label="شهریه ثابت"
                variant="bordered"
                color="primary"
                radius="full"
                endContent="ریال"
                isInvalid={invalid}
                errorMessage={error?.message}
                isDisabled={isSubmitting}
                isRequired
                hideStepper
                {...field}
                onValueChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="cost.variable"
            render={({
              field: { onChange, ...field },
              fieldState: { invalid, error },
            }) => (
              <NumberInput
                label="شهریه متغیر"
                variant="bordered"
                color="primary"
                radius="full"
                endContent="ریال"
                isInvalid={invalid}
                errorMessage={error?.message}
                isDisabled={isSubmitting}
                isRequired
                hideStepper
                {...field}
                onValueChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="cost.total"
            render={({
              field: { onChange, ...field },
              fieldState: { invalid, error },
            }) => (
              <NumberInput
                label="شهریه کل"
                variant="bordered"
                color="primary"
                radius="full"
                endContent="ریال"
                isInvalid={invalid}
                errorMessage={error?.message}
                isDisabled={isSubmitting}
                readOnly
                isRequired
                hideStepper
                {...field}
                onValueChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="account.number"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                label="شماره حساب بانک رفاه"
                inputMode="decimal"
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
            name="account.IBN"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                label="شماره شبا"
                inputMode="decimal"
                variant="bordered"
                color="primary"
                radius="full"
                defaultValue="IR"
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
            name="account.CARD"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                label="شماره کارت"
                inputMode="decimal"
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
          <div className="col-span-full">
            <Controller
              control={control}
              name="images"
              render={({
                field: { name, value, onChange },
                fieldState: { invalid, error },
              }) => (
                <FilesInput
                  dropZoneProps={{
                    accept: { 'image/*': [] },
                    maxFiles: 3,
                  }}
                  className="mx-auto max-w-lg"
                  classNames={{
                    label: 'text-primary',
                  }}
                  label="تصاویر"
                  name={name}
                  value={
                    new Map(
                      (value ?? []).map((val) => [
                        `${Date.now()}-${val.size}`,
                        val,
                      ])
                    )
                  }
                  onValueChange={(value) => {
                    const files = value?.values().toArray();
                    onChange(files);
                  }}
                  isInvalid={invalid}
                  errorMessage={error?.message}
                  isRequired
                >
                  {({ selectedFiles, updateFiles, handleRemoveFile }) => (
                    <FilesPreview
                      files={selectedFiles}
                      onFilesChange={updateFiles}
                    >
                      {(value) => (
                        <FilePreview
                          value={value}
                          onAction={(key, val) => {
                            switch (key) {
                              case 'delete':
                                handleRemoveFile(val[0]);
                                break;
                              default:
                                break;
                            }
                          }}
                        />
                      )}
                    </FilesPreview>
                  )}
                </FilesInput>
              )}
            />
          </div>
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
