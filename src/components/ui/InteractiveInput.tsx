import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface InteractiveInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  showToggle?: boolean;
  validation?: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
  };
}

const InteractiveInput = forwardRef<HTMLInputElement, InteractiveInputProps>(
  ({
    className,
    type,
    label,
    error,
    success,
    helperText,
    showToggle = false,
    validation,
    onChange,
    onBlur,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState<string>('');
    const [localSuccess, setLocalSuccess] = useState<string>('');
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState(props.value || '');

    const actualType = type === 'password' && showPassword ? 'text' : type;
    const hasError = error || localError;
    const hasSuccess = success || localSuccess;

    const validateField = (inputValue: string) => {
      if (!validation) return;

      setLocalError('');
      setLocalSuccess('');

      if (validation.required && !inputValue.trim()) {
        setLocalError('This field is required');
        return;
      }

      if (validation.minLength && inputValue.length < validation.minLength) {
        setLocalError(`Minimum ${validation.minLength} characters required`);
        return;
      }

      if (validation.pattern && !validation.pattern.test(inputValue)) {
        setLocalError('Invalid format');
        return;
      }

      if (validation.custom) {
        const customError = validation.custom(inputValue);
        if (customError) {
          setLocalError(customError);
          return;
        }
      }

      if (inputValue.trim()) {
        setLocalSuccess('Valid');
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      validateField(newValue);
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      validateField(e.target.value);
      onBlur?.(e);
    };

    const handleFocus = () => {
      setIsFocused(true);
    };

    return (
      <div className="space-y-2">
        {label && (
          <Label 
            htmlFor={props.id} 
            className={cn(
              "text-sm font-medium transition-colors",
              hasError && "text-destructive",
              hasSuccess && "text-success",
              isFocused && "text-accent"
            )}
          >
            {label}
            {validation?.required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        
        <div className="relative">
          <Input
            type={actualType}
            className={cn(
              "transition-all duration-300 focus-ring",
              hasError && "border-destructive focus:ring-destructive",
              hasSuccess && "border-success focus:ring-success",
              isFocused && "border-accent shadow-md",
              showToggle && "pr-10",
              className
            )}
            ref={ref}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={
              hasError ? `${props.id}-error` : 
              hasSuccess ? `${props.id}-success` :
              helperText ? `${props.id}-helper` : undefined
            }
            {...props}
          />

          {/* Password toggle */}
          {type === 'password' && showToggle && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          )}

          {/* Status icon */}
          {(hasError || hasSuccess) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {hasError ? (
                <X className="h-4 w-4 text-destructive" />
              ) : (
                <Check className="h-4 w-4 text-success" />
              )}
            </div>
          )}
        </div>

        {/* Messages */}
        {hasError && (
          <p 
            id={`${props.id}-error`}
            className="text-xs text-destructive animate-in slide-in-from-top-1 duration-300"
          >
            {error || localError}
          </p>
        )}

        {hasSuccess && !hasError && (
          <p 
            id={`${props.id}-success`}
            className="text-xs text-success animate-in slide-in-from-top-1 duration-300"
          >
            {success || localSuccess}
          </p>
        )}

        {helperText && !hasError && !hasSuccess && (
          <p 
            id={`${props.id}-helper`}
            className="text-xs text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

InteractiveInput.displayName = 'InteractiveInput';

export { InteractiveInput };