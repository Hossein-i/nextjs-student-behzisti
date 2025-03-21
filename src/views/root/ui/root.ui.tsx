'use client';

import { BlurredCard } from '@/shared/ui/blurred-card';
import { Logo } from '@/shared/ui/logo';
import { Placeholder } from '@/shared/ui/placeholder';
import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RootProps {}

export const Root: React.FC<RootProps> = () => {
  return (
    <section className="h-dvh p-4">
      <BlurredCard
        className="h-full max-w-screen-md"
        classNames={{ body: 'flex-col items-center justify-center' }}
      >
        <section className="max-w-lg">
          <Placeholder
            header="سامانه دانشجویی سازمان بهزیستی کشور"
            description="برای ثبت اطلاعات ترم خود چنانچه نام کاربری و کلمه عبور ندارید، از بخش زیر اقدام به دریافت نام کاربری و کلمه عبور نمایید و در غیر این صورت با نام کاربری و کلمه عبور خود برای ورود به کارتابل خود اقدام نمایید."
            action={
              <div className="w-full space-y-2">
                <section className="flex gap-2">
                  <Button
                    as={Link}
                    href="/auth/sign-up"
                    color="primary"
                    variant="shadow"
                    radius="full"
                    fullWidth
                  >
                    ثبت نام
                  </Button>
                  <Button
                    as={Link}
                    href="/auth"
                    color="primary"
                    variant="bordered"
                    radius="full"
                    fullWidth
                  >
                    ورود
                  </Button>
                </section>

                <section className="text-center">
                  <Button
                    as={Link}
                    href="/legals"
                    color="primary"
                    variant="light"
                    radius="full"
                  >
                    شیوه نامه حمایت های دانشجویی
                  </Button>
                </section>
              </div>
            }
          >
            <Logo />
          </Placeholder>
        </section>
      </BlurredCard>
    </section>
  );
};
