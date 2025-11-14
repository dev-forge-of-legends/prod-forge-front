import { ValidationSchema } from "@app-types/interfaces";
import { validateForm } from "../validation/core";
import { validate, ValidationBuilder } from "../validation/fieldValidators";

export interface BillingFormData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  country: string;
  stateName: string;
}

export const billingValidationSchema: ValidationSchema = {
  firstName: validate.name("First name is required"),
  lastName: validate.name("Last name is required"),
  address: validate.string({ min: 5, max: 200, message: "Address is required" }),
  city: validate.name("City is required"),
  postalCode: ValidationBuilder.field()
    .required("Postal code is required")
    .pattern(/^[0-9]{4,10}$/, "Please enter a valid postal code")
    .build(),
  phone: validate.phone(),
  country: validate.required("Country is required"),
  stateName: validate.required("State is required"),
};

export const validateBillingForm = (data: BillingFormData) => {
  return validateForm(data, billingValidationSchema);
};
