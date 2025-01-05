import { cn } from '@/lib/utils';
import { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-background',
        grey: 'bg-slate-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ type, ...props }, ref) => {
  if (type === 'password') {
    return (
      <PasswordInput type={type} {...props} ref={ref} />
    );
  }

  return <BaseInput type={type} {...props} ref={ref} />;
});
Input.displayName = 'Input';

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const inputType = isVisible ? 'text' : 'password';

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative">
      <BaseInput {...props} type={inputType} className="pr-8" ref={ref} />
      <VisibilityButton isVisible={isVisible} onClick={toggleVisibility} />
    </div>
  );
});
PasswordInput.displayName = 'PasswordInput';

const BaseInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className, variant, type, ...props
  }, ref) => (

    <input
      type={type}
      className={cn(inputVariants({ variant, className }))}
      ref={ref}
      {...props}
    />
  ),
);

BaseInput.displayName = 'Input';

type VisibilityButtonProps = {
    isVisible: boolean
    onClick: () => void
}

const VisibilityButton = ({ isVisible, onClick }:VisibilityButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute top-1/2 right-3 transform -translate-y-1/2"
  >
    {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
  </button>
);

export { Input };
