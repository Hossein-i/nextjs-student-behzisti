import { cn } from '@heroui/react';
import React, { HTMLAttributes, ReactNode } from 'react';

import { hasReactNode } from '@/shared/lib/react';
import { Text, Title } from '../typography';

export interface PlaceholderProps extends HTMLAttributes<HTMLElement> {
  /**
   * Element(s) to be displayed as the primary visual content, typically an
   * image or an animation.
   */
  children?: ReactNode;
  /** The primary text, usually a title or a header, for the placeholder. */
  header?: ReactNode;
  /** Additional descriptive text to provide more details or context. */
  description?: ReactNode;
  /**
   * An actionable element, such as a button, to be placed in the placeholder
   * for user interaction.
   */
  action?: ReactNode;
}

/**
 * A versatile component designed to display a placeholder with optional text,
 * images, and actions.
 */
export const Placeholder: React.FC<PlaceholderProps> = ({
  children,
  header,
  description,
  className,
  action,
  ...restProps
}) => {
  const hasHeader = hasReactNode(header);
  const hasDescription = hasReactNode(description);

  return (
    <section
      className={cn(
        'flex flex-col items-center justify-center gap-6 overflow-hidden p-8',
        className
      )}
      {...restProps}
    >
      {hasReactNode(children) && children}
      {(hasHeader || hasDescription) && (
        <dl className="m-0 text-center">
          {hasHeader && (
            <Title Component="dt" level="3" weight="2">
              {header}
            </Title>
          )}
          {hasDescription && (
            <Text className="text-content4-foreground" Component="dd">
              {description}
            </Text>
          )}
        </dl>
      )}
      {hasReactNode(action) && action}
    </section>
  );
};
