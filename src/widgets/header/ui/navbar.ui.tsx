'use client';

import { BlurredCard } from '@/shared/ui/blurred-card';
import { Logo } from '@/shared/ui/logo';
import { ThemeSwitcher } from '@/shared/ui/theme-switcher';
import { Caption } from '@/shared/ui/typography';
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react';
import Link from 'next/link';
import React from 'react';
import { User } from '../types';
import { UserMenu } from './user-menu.ui';

export interface NavbarProps {
  user: User;
}

export const Navbar: React.FC<NavbarProps> = (props) => {
  const { user } = props;

  return (
    <HeroUINavbar
      maxWidth="2xl"
      className="bg-transparent"
      isBlurred={false}
      shouldHideOnScroll
    >
      <NavbarContent>
        <NavbarItem>
          <NavbarBrand>
            <BlurredCard classNames={{ body: 'p-0' }}>
              <Link href="/my">
                <div className="flex items-center gap-2 p-2">
                  <Logo width={32} height={32} />
                  <Caption>سامانه دانشجویی بهزیستی</Caption>
                </div>
              </Link>
            </BlurredCard>
          </NavbarBrand>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <BlurredCard classNames={{ body: 'flex-row gap-1 p-0' }}>
            <section className="py-1 ps-2">
              <ThemeSwitcher radius="full" />
            </section>
            <UserMenu user={user} />
          </BlurredCard>
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
