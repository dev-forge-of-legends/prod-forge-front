import { VALIDATION_PATTERNS } from "@app-types/constants";
import { ValidationRule } from "@app-types/interfaces";
import { validateField } from "./core";

export class ValidationBuilder {
  private rules: ValidationRule = {};

  static field() {
    return new ValidationBuilder();
  }

  constructor() {}

  required(message?: string) {
    this.rules.required = true;
    if (message) {
      const existingCustom = this.rules.custom;
      this.rules.custom = (value: any) => {
        if (!value || (typeof value === "string" && !value.trim())) {
          return message;
        }
        return existingCustom ? existingCustom(value) : null;
      };
    }
    return this;
  }

  minLength(length: number, message?: string) {
    this.rules.minLength = length;
    if (message) {
      const existingCustom = this.rules.custom;
      this.rules.custom = (value: any) => {
        if (existingCustom) {
          const existingError = existingCustom(value);
          if (existingError) return existingError;
        }
        if (value && value.length < length) {
          return message;
        }
        return null;
      };
    }
    return this;
  }

  maxLength(length: number, message?: string) {
    this.rules.maxLength = length;
    if (message) {
      const existingCustom = this.rules.custom;
      this.rules.custom = (value: any) => {
        if (existingCustom) {
          const existingError = existingCustom(value);
          if (existingError) return existingError;
        }
        if (value && value.length > length) {
          return message;
        }
        return null;
      };
    }
    return this;
  }

  pattern(regex: RegExp, message?: string) {
    this.rules.pattern = regex;
    if (message) {
      const existingCustom = this.rules.custom;
      this.rules.custom = (value: any) => {
        if (existingCustom) {
          const existingError = existingCustom(value);
          if (existingError) return existingError;
        }
        if (value && !regex.test(value)) {
          return message;
        }
        return null;
      };
    }
    return this;
  }

  email(message?: string) {
    return this.pattern(VALIDATION_PATTERNS.email, message || "Please enter a valid email address");
  }

  phone(message?: string) {
    return this.pattern(VALIDATION_PATTERNS.phone, message || "Please enter a valid phone number");
  }

  alphaOnly(message?: string) {
    return this.pattern(VALIDATION_PATTERNS.alphaOnly, message || "Only letters and spaces are allowed");
  }

  custom(validator: (value: any, formData?: any) => string | null) {
    const existingCustom = this.rules.custom;
    this.rules.custom = (value: any, formData?: any) => {
      if (existingCustom) {
        const existingError = existingCustom(value, formData);
        if (existingError) return existingError;
      }
      return validator(value, formData);
    };
    return this;
  }

  oneOf(values: any[], message?: string) {
    return this.custom((value) => {
      if (!values.includes(value)) {
        return message || `Value must be one of: ${values.join(", ")}`;
      }
      return null;
    });
  }

  min(minValue: number, message?: string) {
    return this.custom((value) => {
      const num = Number(value);
      if (!isNaN(num) && num < minValue) {
        return message || `Value must be at least ${minValue}`;
      }
      return null;
    });
  }

  max(maxValue: number, message?: string) {
    return this.custom((value) => {
      const num = Number(value);
      if (!isNaN(num) && num > maxValue) {
        return message || `Value must be no more than ${maxValue}`;
      }
      return null;
    });
  }

  matches(field: string, message?: string) {
    return this.custom((value, formData) => {
      if (formData && value !== formData[field]) {
        return message || `Values do not match`;
      }
      return null;
    });
  }

  when(condition: (formData: any) => boolean, thenRule: ValidationRule) {
    return this.custom((value, formData) => {
      if (condition(formData)) {
        // Apply conditional rule
        return validateField(value, thenRule, formData);
      }
      return null;
    });
  }

  build(): ValidationRule {
    return this.rules;
  }
}

export const validate = {
  required: (message?: string) => ValidationBuilder.field().required(message).build(),
  
  email: (message?: string) => ValidationBuilder.field()
    .required()
    .email(message)
    .build(),
    
  phone: (message?: string) => ValidationBuilder.field()
    .required()
    .phone(message)
    .build(),
    
  string: (options?: { min?: number; max?: number; required?: boolean; message?: string }) => {
    const builder = ValidationBuilder.field();
    if (options?.required !== false) builder.required(options?.message);
    if (options?.min) builder.minLength(options.min);
    if (options?.max) builder.maxLength(options.max);
    return builder.build();
  },
  
  name: (message?: string) => ValidationBuilder.field()
    .required(message)
    .alphaOnly()
    .minLength(1)
    .maxLength(50)
    .build(),
    
  password: (options?: { min?: number; strong?: boolean; message?: string }) => {
    const builder = ValidationBuilder.field().required(options?.message);
    if (options?.min) builder.minLength(options.min);
    if (options?.strong) builder.pattern(VALIDATION_PATTERNS.strongPassword, "Password must contain uppercase, lowercase, number, and special character");
    return builder.build();
  },
  
  custom: (validator: (value: any, formData?: any) => string | null) => 
    ValidationBuilder.field().custom(validator).build(),
    
  // Conditional validation
  when: (condition: (formData: any) => boolean, thenRule: ValidationRule) =>
    ValidationBuilder.field().when(condition, thenRule).build(),
}
