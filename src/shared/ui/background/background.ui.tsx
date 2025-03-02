import Image from 'next/image';
import React from 'react';

import { wallpaperImg } from '@/shared/assets/images';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BackgroundProps {}

export const Background: React.FC<BackgroundProps> = () => {
  return (
    <section className="fixed inset-x-0 inset-y-0 -z-40 h-dvh w-dvw overflow-hidden">
      <Image
        alt="تصویر پس زمینه"
        src={wallpaperImg}
        className="object-cover"
        placeholder="blur"
        sizes="100vw"
        quality={100}
        fill
      />
    </section>
  );
};
