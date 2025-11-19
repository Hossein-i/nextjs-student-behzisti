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

import type { EducationLevel } from '../types';

type ColumnKey =
  | keyof Pick<EducationLevel, 'studentNumber' | 'major' | 'department'>
  | 'index'
  | 'actions';

const columns: Array<{ key: ColumnKey; label: string }> = [
  { key: 'index', label: 'ردیف' },
  { key: 'studentNumber', label: 'شماره دانشجویی' },
  { key: 'major', label: 'رشته | مقطع' },
  { key: 'department', label: 'واحد | نوع واحد دانشگاهی' },
  { key: 'actions', label: 'عملیات‌ها' },
];

export interface EducationLevelsTableProps {
  educationLevels: EducationLevel[];
}

export const EducationLevelsTable: React.FC<EducationLevelsTableProps> = (
  props
) => {
  const { educationLevels } = props;

  const renderCell = useCallback(
    (educationLevel: EducationLevel, columnKey: ColumnKey, index: number) => {
      switch (columnKey) {
        case 'index': {
          return <>{index + 1}</>;
        }
        case 'major': {
          const cellValue = educationLevel[columnKey];
          const { title, level } = cellValue;

          return <>{[title, level.title].join(' | ')}</>;
        }
        case 'department': {
          const cellValue = educationLevel[columnKey];
          const { title, type } = cellValue;

          return <>{[title, type.title].join(' | ')}</>;
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
                    key="edit"
                    href={`/my/education/${educationLevel.id}/edit`}
                  >
                    ویرایش رشته
                  </DropdownItem>
                  <DropdownItem
                    key="terms-list"
                    href={`/my/education/${educationLevel.id}/terms`}
                  >
                    لیست ترم‌ها
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          );
        }
        default: {
          const cellValue = educationLevel[columnKey];

          return cellValue;
        }
      }
    },
    []
  );

  return (
    <Table
      aria-label="جدول مقاطع تحصیلی"
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
        {educationLevels.map((item, index) => (
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
