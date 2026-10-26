import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function negativeNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return { required: true };
    }

    const number = parseFloat(value);
    if (isNaN(number)) {
      return { invalidNumber: true };
    }

    if (number < 0) {
      return { negative: true };
    }

    return null;
  };
}
