import { cn } from '@heroui/react';
import React, { AllHTMLAttributes, ElementType, forwardRef } from 'react';

const stylesWeight = {
  '1': 'font-bold',
  '2': 'font-semibold',
  '3': 'font-normal',
};

export interface TypographyProps extends AllHTMLAttributes<HTMLElement> {
  /**
   * Controls the font weight of the text, with options ranging from light to
   * bold.
   */
  weight?: '1' | '2' | '3';
  /** If true, transforms the text to uppercase for stylistic emphasis. */
  caps?: boolean;
  /**
   * Specifies the HTML tag or React component used to render the text,
   * defaulting to `span`.
   */
  Component?: ElementType;
  /**
   * When true, removes the default margins around the text, useful for inline
   * styling or custom layouts.
   */
  plain?: boolean;
}

/**
 * The Typography component is a versatile wrapper for text content, offering
 * customizable styling options such as weight, capitalization, and HTML tag.
 * It's designed to facilitate consistent text styling across your application,
 * with support for customization through props. The component is highly
 * reusable and adaptable to various design needs.
 */
export const Typography: React.ForwardRefExoticComponent<
  TypographyProps & React.RefAttributes<TypographyProps>
> = forwardRef(
  (
    {
      weight = '3',
      Component = 'span',
      plain = true,
      caps,
      className,
      ...restProps
    },
    ref
  ) => (
    <Component
      ref={ref}
      className={cn(
        plain && 'm-0',
        weight && stylesWeight[weight],
        caps && 'uppercase',
        className
      )}
      {...restProps}
    />
  )
);

Typography.displayName = 'Typography';
