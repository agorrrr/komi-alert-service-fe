import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DestinationManagementState } from '../../state/destination-management-state';

@Component({
  selector: 'app-destination-form',
  templateUrl: './destination-form.component.html',
  styleUrl: './destination-form.component.scss',
  standalone: false,
})
export class DestinationFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  @Input() isCreation: boolean = true;
  @Output() cbSuccess = new EventEmitter<void>();

  formGroup: FormGroup | null = null;
  isLoading: boolean = false;

  constructor(readonly state: DestinationManagementState) { }

  ngOnInit(): void {
    this.state.formGroup$
      .pipe(takeUntil(this.destroy$))
      .subscribe((formGroup) => {
        this.formGroup = formGroup;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    if (!this.formGroup || this.formGroup.invalid) {
      this.formGroup?.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const apiCall = this.isCreation
      ? this.state.createDestinationAPI()
      : this.state.updateDestinationAPI();

    apiCall.subscribe({
      next: () => {
        this.isLoading = false;
        this.cbSuccess.emit();
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  onCancel() {
    this.cbSuccess.emit();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.formGroup?.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  get selectedType(): string | null {
    return this.formGroup?.get('type')?.value || null;
  }
}
