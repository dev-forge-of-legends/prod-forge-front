import { ValidationSchema } from "@app-types/interfaces";
import { validateForm } from "../validation/core";
import { validate } from "../validation/fieldValidators";

export interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export const resetPasswordValidationSchema: ValidationSchema = {
  newPassword: validate.password({ min: 6 }),
  confirmPassword: validate.password({ min: 6 }),
};

export const validateResetPasswordForm = (data: ResetPasswordFormData) => {
  return validateForm(data, resetPasswordValidationSchema);
};
