import React, { useState } from "react";
import { IconButton, Input, Textarea } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { Fieldset } from "@chakra-ui/react";
import {
  FieldError,
  UseFormRegister,
  Path,
  FieldValues,
} from "react-hook-form";
import { InputGroup } from "./ui/input-group";
import { LuEye, LuEyeClosed } from "react-icons/lu";

// Define a generic type for form values that extends FieldValues
interface FormFieldProps<TFormValues extends FieldValues> {
  label?: string;
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  error?: FieldError;
  type?: string;
  component?: "input" | "textarea" | "custom";
  mt?: number;
  children?: React.ReactNode;
  togglePassword?: boolean;
  placeHolder?: string
}

// Generic component that can work with any form schema
function FormField<TFormValues extends FieldValues>({
  label,
  name,
  register,
  error,
  type = "text",
  component = "input",
  mt = 4,
  children,
  placeHolder,
  togglePassword,
}: FormFieldProps<TFormValues>) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = togglePassword
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <Fieldset.Content mt={mt}>
      <Field label={label}>
        {component === "input" && togglePassword ? (
          <InputGroup
          width="full"
            endElement={
              <IconButton
                aria-label="Toggle password visibility"
                onClick={() => setShowPassword((prev) => !prev)}
                variant="ghost"
                size="sm"
              >
                {showPassword ? <LuEyeClosed /> : <LuEye />}
              </IconButton>
            }
          >
            <Input {...register(name)} type={inputType} placeholder={placeHolder} />
          </InputGroup>
        ) :
        (component === "input" && <Input {...register(name)} type={type} placeholder={placeHolder} />)}
        {component === "textarea" && <Textarea {...register(name)} placeholder={placeHolder} />}
        {component === "custom" && children}
        {error && <span style={{ color: "red" }}>{error.message}</span>}
      </Field>
    </Fieldset.Content>
  );
}

export default FormField;
