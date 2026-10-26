import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function onlyNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return { required: true };
    }

    const number = parseFloat(value);
    if (isNaN(number)) {
      return { invalidNumber: true };
    }

    if (number < 1) {
      return { zeroValue: true };
    }

    return null;
  };
}
