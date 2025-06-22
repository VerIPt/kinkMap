import React, { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'search';
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = 'default', error, ...props }, ref) => {
    const baseClasses = 'flex h-10 w-full rounded-lg border bg-background-tertiary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50';
    
    const variants = {
      default: 'border-border',
      search: 'border-border bg-background-secondary rounded-full px-4',
    };

    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            baseClasses,
            variants[variant],
            error && 'border-red-500 focus:ring-red-500/50',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };