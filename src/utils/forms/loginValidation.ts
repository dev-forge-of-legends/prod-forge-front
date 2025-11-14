import { ValidationSchema } from "@app-types/interfaces";
import { validateForm } from "../validation/core";
import { validate } from "../validation/fieldValidators";

export interface LoginFormData {
  email: string;
  password: string;
}

export const loginValidationSchema: ValidationSchema = {
  email: validate.email("Please enter a valid email address"),
  password: validate.password({ min: 6 }),
};

export const validateLoginForm = (data: LoginFormData) => {
  return validateForm(data, loginValidationSchema);
};
