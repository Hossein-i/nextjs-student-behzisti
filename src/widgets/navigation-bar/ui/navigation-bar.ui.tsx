'use client';

import { Tab, Tabs } from '@heroui/react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React from 'react';

import { navigationLinks } from '../constants';

import { BlurredCard } from '@/shared/ui/blurred-card';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NavigationBarProps {}

export const NavigationBar: React.FC<NavigationBarProps> = () => {
  const pathname = usePathname();

  return (
    <section className="fixed bottom-2 left-1/2 z-40 flex w-full max-w-xs -translate-x-1/2 justify-center lg:top-2 lg:bottom-auto">
      <BlurredCard classNames={{ body: 'p-1' }} fullWidth>
        <Tabs
          aria-label="Navigations"
          dir="ltr"
          selectedKey={pathname}
          color="primary"
          variant="light"
          radius="full"
          fullWidth
        >
          {navigationLinks.map(({ href, icon, title }) => {
            const isActive = pathname === href;
            const Icon = isActive ? icon.inactive : icon.active;

            return (
              <Tab
                key={href}
                href={href}
                title={
                  isActive ? (
                    <motion.div
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-center gap-1"
                    >
                      <Icon className="h-6 w-6" />
                      <span>{title}</span>
                    </motion.div>
                  ) : (
                    <Icon className="h-6 w-6" />
                  )
                }
                titleValue={title}
                className="p-1"
              />
            );
          })}
        </Tabs>
      </BlurredCard>
    </section>
  );
};
