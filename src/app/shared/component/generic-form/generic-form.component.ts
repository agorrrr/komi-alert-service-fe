import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputGroup} from "primeng/inputgroup";
import {TranslatePipe} from "@ngx-translate/core";
import {InputGroupAddon} from "primeng/inputgroupaddon";
import {NgForOf, NgIf} from "@angular/common";
import {InputText} from "primeng/inputtext";
import {IsFieldInvalidPipe} from "../../pipe/is-field-invalid.pipe";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {LoadingCircularComponent} from "../loading/loading-circular/loading-circular.component";

export interface FormField {
  name: string;
  type?: 'text' | 'number';
  required?: boolean;
  label?: string;
  maxLength?: number;
}

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss'],
  standalone: true,
  imports: [
    InputGroup,
    ReactiveFormsModule,
    TranslatePipe,
    InputGroupAddon,
    NgIf,
    InputText,
    IsFieldInvalidPipe,
    ButtonDirective,
    Ripple,
    LoadingCircularComponent,
    NgForOf
  ]
})
export class GenericFormComponent implements OnInit, OnChanges {
  @Input() fields: FormField[] = [];
  @Input() submitLabel: string = 'btnSubmit';
  @Input() cancelLabel: string = 'btnCancel';
  @Input() isLoading: boolean = false;
  @Input() initialData: any = null;

  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
    this.populateForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && !changes['initialData'].firstChange) {
      this.populateForm();
    }
  }

  private buildForm(): void {
    const group: any = {};

    this.fields.forEach(field => {
      const validators = [];

      if (field.required) {
        validators.push(Validators.required);
      }

      if (field.maxLength) {
        validators.push(Validators.maxLength(field.maxLength));
      }

      group[field.name] = ['', validators];
    });

    this.formGroup = this.fb.group(group);
  }

  private populateForm(): void {
    if (this.initialData && this.formGroup) {
      this.formGroup.patchValue(this.initialData);
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.formSubmit.emit(this.formGroup.value);
    } else {
      Object.keys(this.formGroup.controls).forEach(key => {
        this.formGroup.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }

  getFieldLabel(field: FormField): string {
    return field.label || field.name;
  }

  getMaxLength(field: FormField): number {
    return field.maxLength || 255;
  }

  getRemainingChars(fieldName: string, maxLength: number): number {
    const value = this.formGroup?.value?.[fieldName] || '';
    return maxLength - (value?.length || 0);
  }

  getInputType(field: FormField): string {
    return field.type === 'number' ? 'number' : 'text';
  }
}
