'use client';

import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import React, { useCallback } from 'react';

import { TermByEducationLevel } from '../types';

type ColumnKey =
  | keyof Pick<
      TermByEducationLevel,
      'year' | 'semister' | 'unit' | 'cost' | 'MadadkarAcceptance'
    >
  | 'index'
  | 'actions';

const columns: Array<{ key: ColumnKey; label: string }> = [
  { key: 'index', label: 'ردیف' },
  { key: 'year', label: 'سال تحصیلی' },
  { key: 'semister', label: 'نمیسال' },
  { key: 'unit', label: 'واحد' },
  { key: 'cost', label: 'شهریه ثابت + شهریه متغیر = شهریه کل' },
  { key: 'MadadkarAcceptance', label: ' وضعیت تایید مددکاری ' },
  { key: 'actions', label: 'عملیات‌ها' },
];

export interface TermsByEducationLevelTableProps {
  termsByEducationLevel: TermByEducationLevel[];
}

export const TermsByEducationLevelTable: React.FC<
  TermsByEducationLevelTableProps
> = (props) => {
  const { termsByEducationLevel } = props;
  const educationLevel = termsByEducationLevel[0].detail;

  const renderCell = useCallback(
    (
      termByEducationLevel: TermByEducationLevel,
      columnKey: ColumnKey,
      index: number
    ) => {
      switch (columnKey) {
        case 'index': {
          return <>{index + 1}</>;
        }
        case 'year': {
          const cellValue = termByEducationLevel[columnKey];
          const { title } = cellValue;

          return <>{title}</>;
        }
        case 'cost': {
          const cellValue = termByEducationLevel[columnKey];
          const { fixed, variable, total } = cellValue;
          const formatter = Intl.NumberFormat('fa-IR');

          return (
            <>
              {formatter.format(fixed)} + {formatter.format(variable)} ={' '}
              {formatter.format(total)} ریال
            </>
          );
        }
        case 'MadadkarAcceptance': {
          const cellValue = termByEducationLevel[columnKey];

          return cellValue ? 'تایید شده' : 'تایید نشده';
        }
        case 'actions': {
          return (
            <Dropdown>
              <DropdownTrigger className="cursor-pointer">
                <EllipsisVerticalIcon className="h-6 w-6" />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownSection>
                  <DropdownItem
                    key="letter-of-introduction"
                    href={`/my/education/${educationLevel.id}/terms/${termByEducationLevel.id}/letter-of-introduction`}
                  >
                    معرفی نامه
                  </DropdownItem>
                  <DropdownItem
                    key="edit"
                    href={`/my/education/${educationLevel.id}/terms/${termByEducationLevel.id}/edit`}
                  >
                    ویرایش ترم
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    href={`/my/education/${educationLevel.id}/terms/${termByEducationLevel.id}/delete`}
                  >
                    حذف
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          );
        }
        default: {
          const cellValue = termByEducationLevel[columnKey];

          return cellValue;
        }
      }
    },
    [educationLevel.id]
  );

  return (
    <Table
      aria-label="جدول ترم‌های تحصیلی"
      classNames={{
        base: 'overflow-auto',
        td: 'whitespace-nowrap',
      }}
      isStriped
      isHeaderSticky
      removeWrapper
    >
      <TableHeader>
        {columns.map(({ key, label }) => (
          <TableColumn key={key}>{label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {termsByEducationLevel.map((item, index) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey as ColumnKey, index)}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
