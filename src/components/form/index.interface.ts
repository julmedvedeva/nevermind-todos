import { FormEvent } from 'react';

export interface TaskInputProps {
  inputValue: string;
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e: FormEvent) => void;
}
