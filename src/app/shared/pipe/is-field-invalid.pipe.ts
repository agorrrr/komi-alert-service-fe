import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Pipe({
  name: 'isFieldInvalid',
  standalone: true,
  pure: false
})
export class IsFieldInvalidPipe implements PipeTransform {

  transform(formGroup: FormGroup, fieldName: string, validationType?: string): boolean {
    const field = formGroup.get(fieldName);

    if (!field) {
      return false;
    }

    const isFieldTouchedOrDirty = field.dirty || field.touched;

    // If no specific validation type is provided, check general validity
    if (!validationType) {
      return !!(field.invalid && isFieldTouchedOrDirty);
    }

    // Check specific validation types
    switch (validationType.toLowerCase()) {
      case 'required':
        return !!(field.errors?.['required'] && isFieldTouchedOrDirty);

      case 'email':
        return !!(field.errors?.['email'] && isFieldTouchedOrDirty);

      case 'minlength':
        return !!(field.errors?.['minlength'] && isFieldTouchedOrDirty);

      case 'maxlength':
        return !!(field.errors?.['maxlength'] && isFieldTouchedOrDirty);

      case 'min':
        return !!(field.errors?.['min'] && isFieldTouchedOrDirty);

      case 'max':
        return !!(field.errors?.['max'] && isFieldTouchedOrDirty);

      case 'pattern':
        return !!(field.errors?.['pattern'] && isFieldTouchedOrDirty);

      case 'url':
        return !!(field.errors?.['url'] && isFieldTouchedOrDirty);

      case 'number':
        return !!(field.errors?.['number'] && isFieldTouchedOrDirty);

      case 'phoneNumber':
        return !!(field.errors?.['phoneNumber'] && isFieldTouchedOrDirty);

      case 'custom':
        // For custom validators, check if any error exists
        return !!(field.errors && Object.keys(field.errors).length > 0 && isFieldTouchedOrDirty);

      default:
        // If validation type is not recognized, fall back to general validity check
        return !!(field.invalid && isFieldTouchedOrDirty);
    }
  }

  /**
   * Get the error message for a specific validation type
   * This method can be used in templates to display specific error messages
   */
  getErrorMessage(formGroup: FormGroup, fieldName: string, validationType?: string): string {
    const field = formGroup.get(fieldName);

    if (!field || !field.errors) {
      return '';
    }

    const errors = field.errors;

    if (!validationType) {
      // Return the first error message
      const firstErrorKey = Object.keys(errors)[0];
      return this.getErrorMessageByKey(firstErrorKey, errors[firstErrorKey]);
    }

    const errorKey = validationType.toLowerCase();
    if (errors[errorKey]) {
      return this.getErrorMessageByKey(errorKey, errors[errorKey]);
    }

    return '';
  }

  private getErrorMessageByKey(errorKey: string, errorValue: any): string {
    switch (errorKey) {
      case 'required':
        return 'This field is required';
      case 'email':
        return 'Please enter a valid email address';
      case 'minlength':
        return `Minimum length is ${errorValue.requiredLength} characters`;
      case 'maxlength':
        return `Maximum length is ${errorValue.requiredLength} characters`;
      case 'min':
        return `Minimum value is ${errorValue.min}`;
      case 'max':
        return `Maximum value is ${errorValue.max}`;
      case 'pattern':
        return 'Please enter a valid format';
      case 'url':
        return 'Please enter a valid URL';
      case 'phoneNumber':
        return 'Please enter a valid phone number';
      default:
        return 'Invalid input';
    }
  }
}
