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
import { UserManagementState } from '../../state/user-management-state';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  standalone: false,
})
export class UserFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  @Input() isCreation: boolean = true;
  @Output() cbSuccess = new EventEmitter<void>();

  formGroup: FormGroup | null = null;
  isLoading: boolean = false;

  constructor(readonly state: UserManagementState) {}

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
      ? this.state.createUserAPI()
      : this.state.updateUserAPI();

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
}
