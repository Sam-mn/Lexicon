import React from "react";
import { Form, Placeholder } from "react-bootstrap";

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  as?: "input" | "textarea";
  rows?: number;
  placeholder?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  value,
  placeholder = "",
  onChange,
  required = false,
  as = "input",
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
      placeholder={placeholder}
      rows={rows}
    />
  </Form.Group>
);
