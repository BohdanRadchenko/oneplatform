import * as React from 'react';
import { buttonVariants } from './buttonVariants';
import { Slot } from "@radix-ui/react-slot"

import { cn } from '@radchenkobohdan/utils';
import { ButtonProps } from './Button.types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
export default Button;
