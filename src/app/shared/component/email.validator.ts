import { AbstractControl, ValidatorFn } from '@angular/forms';

export function conditionalEmailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (control.value && !emailRegex.test(control.value)) {
      return { 'invalidEmail': { value: control.value } };
    }
    return null;

  };
}


export function customEmailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value) {
      return conditionalEmailValidator()(control);
    }
    return null;
  };
}