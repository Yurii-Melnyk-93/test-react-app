import type { FieldError } from 'react-hook-form';

export type FormFieldProps = {
  as?: 'input' | 'textarea';
  id: string;
  label: string;
  error?: FieldError;
} & React.ComponentPropsWithRef<'input' | 'textarea'>;
