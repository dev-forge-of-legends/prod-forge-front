import { ValidationSchema } from "@app-types/interfaces";
import { validateForm, validateSingleField } from "../validation/core";
import { validate, ValidationBuilder } from "../validation/fieldValidators";

export interface SignupFormData {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  address: string;
  dob: string;
  country: string;
  stateName: string;
  city: string;
  phone: string;
  password: string;
  confirmPassword: string;
  postalCode: string;
}

export const signupValidationSchema: ValidationSchema = {
  email: validate.email(),
  firstName: validate.name("First name is required"),
  lastName: validate.name("Last name is required"),
  userName: ValidationBuilder.field()
    .required("Username is required")
    .minLength(1, "Username must be at least 1 character")
    .maxLength(30, "Username cannot exceed 30 characters")
    .build(),
  address: validate.string({
    min: 5,
    max: 200,
    message: "Address is required",
  }),
  dob: validate.custom((value: any) => {
    if (!value) return "Date of birth is required";
    const date = new Date(value);
    if (isNaN(date.getTime())) return "Please enter a valid date";
    const age = new Date().getFullYear() - date.getFullYear();
    if (age < 18) return "You must be at least 18 years old";
    if (age > 120) return "Please enter a valid birth date";
    return null;
  }),
  country: validate.required("Country is required"),
  stateName: validate.required("State is required"),
  city: validate.name("City is required"),
  phone: ValidationBuilder.field()
    .required("Phone number is required")
    .custom((value: string) => {
      // Remove all non-digit characters for validation
      const digits = value.replace(/\D/g, '');
      
      // Check if we have any digits after removing formatting
      if (!digits) {
        return "Please enter a valid phone number";
      }
      
      // Check for valid US/Canada phone number formats
      // US/Canada: 10 digits (no country code) or 11 digits (with +1 country code)
      if (digits.length === 10) {
        // 10 digits: must start with area code (2-9 for first digit)
        if (!/^[2-9]\d{9}$/.test(digits)) {
          return "Please enter a valid US/Canada phone number (area code cannot start with 0 or 1)";
        }
      } else if (digits.length === 11) {
        // 11 digits: must start with 1 (country code) followed by valid 10-digit number
        if (!/^1[2-9]\d{9}$/.test(digits)) {
          return "Please enter a valid US/Canada phone number with country code (+1)";
        }
      } else {
        return "Phone number must be 10 digits (US/Canada) or 11 digits with country code (+1)";
      }
      
      return null;
    })
    .build(),
  password: validate.password({ min: 6 }),
  confirmPassword: ValidationBuilder.field()
    .required("Please confirm your password")
    .matches("password", "Passwords do not match")
    .build(),
  postalCode: ValidationBuilder.field()
    .required("Postal code is required")
    .pattern(/^[0-9]{4,10}$/, "Please enter a valid postal code")
    .build(),
};

export const validateSignupForm = (data: SignupFormData) => {
  return validateForm(data, signupValidationSchema);
};

export const validateEmailStep = (email: string) => {
  return validateSingleField("email", { email }, signupValidationSchema);
};
