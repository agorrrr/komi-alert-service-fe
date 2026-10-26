import { FormControl } from '@angular/forms';


export function alphabetOnly(control: FormControl) {
  
  if (!control.value) {
    return null;
  }

  
  const alphabetPattern = /^[a-zA-Z]*$/;

  
  const valid = alphabetPattern.test(control.value);

  
  return valid ? null : { alphabetOnly: true };
}
