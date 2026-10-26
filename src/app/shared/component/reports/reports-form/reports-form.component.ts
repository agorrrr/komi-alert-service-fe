import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-reports-form',
  templateUrl: './reports-form.component.html',
  styleUrls: ['./reports-form.component.scss'],
  standalone: false,
})
export class ReportsFormComponent {
  @Input() formFields: any[] = [];
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  formGroup: FormGroup;

  constructor(readonly fb: FormBuilder) {
    this.formGroup = this.fb.group({});
  }

  ngOnInit() {
    this.formFields.forEach((field) => {
      if (field.type === 'DROPDOWN') {
        this.formGroup.addControl(field.id, this.fb.control(''));
      } else if (field.type === 'INPUTTEXT') {
        this.formGroup.addControl(field.id, this.fb.control(''));
      } else if (field.type === 'CALENDAR') {
        if (field.range) {
          this.formGroup.addControl(
            `${field.id}Start`,
            this.fb.control('', Validators.required),
          );
          this.formGroup.addControl(
            `${field.id}End`,
            this.fb.control('', [
              Validators.required,
              this.dateRangeValidator(field.id),
            ]),
          );
        } else {
          this.formGroup.addControl(field.id, this.fb.control(''));
        }
      }
    });
  }
  onFormSubmit() {
    this.formSubmitted.emit(this.formGroup.value);
  }
  dateRangeValidator(fieldName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const startValue = this.formGroup.get(`${fieldName}Start`)?.value;
      const endValue = control.value;
      if (startValue && endValue && startValue > endValue) {
        return { dateRangeError: true };
      }
      return null;
    };
  }
}
