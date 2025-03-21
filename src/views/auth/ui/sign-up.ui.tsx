'use client';

import { BackToHome } from '@/shared/ui/back-to-home';
import { BlurredCard } from '@/shared/ui/blurred-card';
import { Logo } from '@/shared/ui/logo';
import { Placeholder } from '@/shared/ui/placeholder';
import {
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerContent,
} from '@heroui/react';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const SignUpForm = dynamic(
  async () =>
    await import('@/features/auth/ui/sign-up/sign-up-form.ui').then(
      (res) => res.SignUpForm
    ),
  {
    loading: () => <p className="text-center">لطفا صبر کنید...</p>,
    ssr: false,
  }
);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SignUpProps {}

export const SignUp: React.FC<SignUpProps> = () => {
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  return (
    <section className="h-dvh p-4">
      <BlurredCard
        className="h-full max-w-screen-md"
        classNames={{ body: 'flex-col items-center' }}
      >
        <section className="w-full max-w-lg space-y-4">
          <Placeholder
            header="سامانه دانشجویی سازمان بهزیستی کشور"
            description={
              <div className="prose text-justify prose-p:text-content4-foreground">
                <p>
                  در این بخش برای ثبت اطلاعات ترم خود ابتدا باید نام کاربری و
                  رمز عبور دریافت کنید.
                </p>
                <p>
                  در ثبت اطلاعات دانشجویی خود دقت نمایید در صورت مغایرت در
                  اطلاعات شما از حمایت های دانشجویی سازمان بهزیستی محروم می
                  شوید.
                </p>
                <p>
                  ثبت در این سامانه هیچ حقی برای ثبت نام کننده ایجاد نمی کند و
                  اطلاعات بعد از پالاش و صحت سنجی با مراجع ذیصلاح به ترتیب
                  اولویت بندی و برای تایید به مددکاران سازمان ارسال می گردد.
                </p>
                <p>
                  <mark>
                    محدودیت ثبت نام تا اول ابان برداشته شد لذا در ثبت اطلاعات
                    دقت کافی داشته باشید.
                  </mark>
                </p>
                <p>
                  بعد از دریافت نام کاربری و رمز عبور با ورود به پنل خود باید
                  اطلاعات و مستندات ترم جاری دانشگاه خود را وارد و آپلود نمایید.
                </p>
                <p>
                  در بخش ورود اطلاعات شماره همراه دقت نمایید باید شماره همراه
                  شما به نام شما باشد.
                </p>
                <p>
                  <mark>
                    چنانچه رشته یا دانشگاه شما در بخش فیلد های مربوطه موجود نبود
                    می توانید با شماره های پیشتیبانی سامانه در ساعات اداری (
                    شنبه تا چهارشنبه ساعت 8 الی 14:30 ) تماس بگیرید تا پشتیبانان
                    سامانه شما را راهنمایی کنند.
                  </mark>
                </p>
                <p>
                  شماره های پشتیبانی:
                  <br />
                  021-66740054
                  <br />
                  021-66740053
                  <br />
                  021-66740055
                  <br />
                  021-66740059
                  <br />
                  داخلی 201، 202، 203
                </p>
              </div>
            }
            action={
              <div className="w-full space-y-2">
                <Checkbox
                  isSelected={hasAcceptedTerms}
                  onValueChange={setHasAcceptedTerms}
                >
                  کلیه اطلاعات فوق را تایید می کنم و شرایط را می پذیرم.
                </Checkbox>
                <Button
                  color="primary"
                  variant="shadow"
                  radius="full"
                  onPress={() => setShowSignUpForm(true)}
                  isDisabled={!hasAcceptedTerms}
                  fullWidth
                >
                  ادامه
                </Button>
                <BackToHome
                  color="primary"
                  variant="bordered"
                  radius="full"
                  fullWidth
                />
              </div>
            }
          >
            <Logo />
          </Placeholder>

          <Drawer
            backdrop="blur"
            isOpen={showSignUpForm}
            onOpenChange={setShowSignUpForm}
          >
            <DrawerContent>
              {() => (
                <>
                  <DrawerBody>
                    <SignUpForm />
                  </DrawerBody>
                </>
              )}
            </DrawerContent>
          </Drawer>
        </section>
      </BlurredCard>
    </section>
  );
};
