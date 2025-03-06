'use client';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User as HeroUIUser,
} from '@heroui/react';
import React from 'react';
import { User } from '../types';

export interface UserMenuProps {
  user: User;
}

export const UserMenu: React.FC<UserMenuProps> = (props) => {
  const { user } = props;

  return (
    <Dropdown>
      <DropdownTrigger className="cursor-pointer">
        <HeroUIUser
          name={[user.firstName, user.lastName].join(' ')}
          avatarProps={{ size: 'sm' }}
          className="px-2 py-1"
          classNames={{ wrapper: 'max-md:hidden' }}
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat">
        <DropdownSection>
          <DropdownItem key="profile" href="/my/profile">
            پروفایل
          </DropdownItem>
          <DropdownItem key="sign-out" href="/auth/sign-out" color="danger">
            خروج
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
