import { logoImg } from '@/shared/assets/images';
import { cn } from '@heroui/react';
import Image, { ImageProps } from 'next/image';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LogoProps extends Partial<ImageProps> {}

export const Logo: React.FC<LogoProps> = (props) => {
  const {
    alt = 'لوگوی بهزیستی',
    src = logoImg,
    className,
    width = 64,
    height = 64,
    placeholder = 'blur',
    ...restProps
  } = props;

  return (
    <Image
      alt={alt}
      src={src}
      className={cn('mx-auto', className)}
      width={width}
      height={height}
      placeholder={placeholder}
      {...restProps}
    />
  );
};
