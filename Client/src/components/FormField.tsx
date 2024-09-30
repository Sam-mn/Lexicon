import React from 'react';
import { Form } from 'react-bootstrap';

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  as?: 'input' | 'textarea';
  rows?: number;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  required = false,
  as = 'input',
  rows,
}) => (
  <Form.Group className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Form.Control
      as={as}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
    />
  </Form.Group>
);
