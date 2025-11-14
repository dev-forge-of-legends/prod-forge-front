import { BaseFormData, ValidationErrors, ValidationRule, ValidationSchema } from "@app-types/interfaces";
/**
 * Validates a single field against its validation rule
 */
export const validateField = (
  value: any,
  rules: ValidationRule,
  formData?: BaseFormData
): string | null => {
  // Required check
  if (
    rules.required &&
    (!value || (typeof value === "string" && !value.trim()))
  ) {
    return "This field is required.";
  }

  // Skip other validations if field is empty and not required
  if (!value || (typeof value === "string" && !value.trim())) {
    return null;
  }

  // String-specific validations
  if (typeof value === "string") {
    // Min length check
    if (rules.minLength && value.length < rules.minLength) {
      return `Must be at least ${rules.minLength} characters long.`;
    }

    // Max length check
    if (rules.maxLength && value.length > rules.maxLength) {
      return `Must be no more than ${rules.maxLength} characters long.`;
    }

    // Pattern check
    if (rules.pattern && !rules.pattern.test(value)) {
      return "Invalid format.";
    }
  }

  // Custom validation
  if (rules.custom) {
    return rules.custom(value, formData);
  }

  return null;
};

/**
 * Validates an entire form against a validation schema
 */
export const validateForm = <T extends BaseFormData>(
  data: T,
  schema: ValidationSchema
): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.keys(schema).forEach((fieldName) => {
    const value = data[fieldName];
    const rules = schema[fieldName];
    const error = validateField(value, rules, data);

    if (error) {
      errors[fieldName] = error;
    }
  });

  return errors;
};

/**
 * Validates a single field from a form
 */
export const validateSingleField = <T extends BaseFormData>(
  fieldName: string,
  data: T,
  schema: ValidationSchema
): string | null => {
  const value = data[fieldName];
  const rules = schema[fieldName];
  
  if (!rules) {
    return null;
  }

  return validateField(value, rules, data);
};

/**
 * Checks if a form is valid (has no errors)
 */
export const isFormValid = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length === 0;
};

/**
 * Gets the first error message from validation errors
 */
export const getFirstError = (errors: ValidationErrors): string | null => {
  const firstErrorKey = Object.keys(errors)[0];
  return firstErrorKey ? errors[firstErrorKey] : null;
};

/**
 * Clears specific field errors
 */
export const clearFieldErrors = (
  errors: ValidationErrors,
  fieldNames: string[]
): ValidationErrors => {
  const newErrors = { ...errors };
  fieldNames.forEach((fieldName) => {
    delete newErrors[fieldName];
  });
  return newErrors;
};

/**
 * Merge validation errors from multiple sources
 */
export const mergeValidationErrors = (
  ...errorObjects: ValidationErrors[]
): ValidationErrors => {
  return Object.assign({}, ...errorObjects);
};
