import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  User,
  UserManagementService,
  CreateUserDTO,
  UpdateUserDTO,
} from '../service/user-management.service';
import { AlertService } from '../../../services/alert.service';

export interface PaginationData {
  first: number;
  page: number;
  rows: number;
  totalRecord: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserManagementState {
  private isLoadingState = new BehaviorSubject<boolean>(false);
  private usersState = new BehaviorSubject<User[]>([]);
  private selectedDataState = new BehaviorSubject<User | null>(null);
  private paginationDataState = new BehaviorSubject<PaginationData>({
    first: 0,
    page: 1,
    rows: 10,
    totalRecord: 0,
  });

  // Form-related state
  private formGroupState = new BehaviorSubject<FormGroup | null>(null);
  private isCreationModeState = new BehaviorSubject<boolean>(true);
  private formLoadingState = new BehaviorSubject<boolean>(false);

  // Filter form state
  private filterFormGroupState = new BehaviorSubject<FormGroup | null>(null);

  // Public observables
  users$ = this.usersState.asObservable();
  paginationData$ = this.paginationDataState.asObservable();
  selectedData$ = this.selectedDataState.asObservable();
  isLoading$ = this.isLoadingState.asObservable();
  formGroup$ = this.formGroupState.asObservable();
  filterFormGroup$ = this.filterFormGroupState.asObservable();

  constructor(
    private svc: UserManagementService,
    private fb: FormBuilder,
    private alertSvc: AlertService,
  ) {}

  // API Methods
  getUsersAPI() {
    this.isLoadingState.next(true);
    const { rows, page } = this.paginationDataState.value;

    this.svc.getAll(rows.toString(), page.toString()).subscribe({
      next: ({ users, total }) => {
        this.usersState.next(users);
        this.paginationDataState.next({
          ...this.paginationDataState.value,
          totalRecord: total,
        });
        this.isLoadingState.next(false);
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.isLoadingState.next(false);
      },
    });
  }

  createUserAPI(): Observable<any> {
    this.formLoadingState.next(true);

    const formGroup = this.formGroupState.value;
    if (!formGroup || formGroup.invalid) {
      this.formLoadingState.next(false);
      throw new Error('Form is invalid');
    }

    const { username, password, email } = formGroup.value;
    const payload: CreateUserDTO = { username, password, email };

    return new Observable((observer) => {
      this.svc.create(payload).subscribe({
        next: () => {
          this.alertSvc.showSuccessCustom('User created successfully');
          this.getUsersAPI();
          this.formLoadingState.next(false);
          observer.next({});
          observer.complete();
        },
        error: (error) => {
          this.formLoadingState.next(false);
          this.alertSvc.showErrorCustom(
            error?.error?.message || 'Failed to create user',
          );
          observer.error(error);
        },
      });
    });
  }

  updateUserAPI(): Observable<any> {
    this.formLoadingState.next(true);

    const formGroup = this.formGroupState.value;
    const selectedData = this.selectedDataState.value;

    if (!formGroup || formGroup.invalid || !selectedData) {
      this.formLoadingState.next(false);
      throw new Error('Form is invalid or no user selected');
    }

    const { username, password, email } = formGroup.value;
    const payload: UpdateUserDTO = {};

    if (username) payload.username = username;
    if (password) payload.password = password;
    if (email !== undefined) payload.email = email;

    return new Observable((observer) => {
      this.svc.update(selectedData.id, payload).subscribe({
        next: () => {
          this.alertSvc.showSuccessCustom('User updated successfully');
          this.getUsersAPI();
          this.formLoadingState.next(false);
          observer.next({});
          observer.complete();
        },
        error: (error) => {
          this.formLoadingState.next(false);
          this.alertSvc.showErrorCustom(
            error?.error?.message || 'Failed to update user',
          );
          observer.error(error);
        },
      });
    });
  }

  deleteUserAPI() {
    this.isLoadingState.next(true);
    const selectedData = this.selectedDataState.value;

    if (!selectedData) {
      this.isLoadingState.next(false);
      return;
    }

    this.svc.delete(selectedData.id).subscribe({
      next: () => {
        this.alertSvc.showSuccessCustom('User deleted successfully');
        this.getUsersAPI();
        this.isLoadingState.next(false);
      },
      error: (err) => {
        console.error('Error deleting user:', err);
        this.alertSvc.showErrorCustom(
          err?.error?.message || 'Failed to delete user',
        );
        this.isLoadingState.next(false);
      },
    });
  }

  // Form Methods
  initializeForm(): void {
    const formGroup = this.fb.group({
      id: [null],
      username: [null, Validators.required],
      password: [null],
      email: [null, Validators.email],
    });
    this.formGroupState.next(formGroup);
  }

  initializeFilterForm(): void {
    const filterFormGroup = this.fb.group({
      username: [null],
      email: [null],
    });
    this.filterFormGroupState.next(filterFormGroup);
  }

  loadForm() {
    const formGroup = this.formGroupState.value;
    const selectedData = this.selectedDataState.value;

    if (!formGroup || !selectedData) {
      return;
    }

    formGroup.patchValue({
      id: selectedData.id,
      username: selectedData.username,
      email: selectedData.email,
      password: null, // Don't load password for edit
    });

    // Password not required for update
    formGroup.get('password')?.clearValidators();
    formGroup.get('password')?.updateValueAndValidity();
  }

  resetForm() {
    const formGroup = this.formGroupState.value;
    if (formGroup) {
      formGroup.reset();
      // Restore password required for create
      formGroup.get('password')?.setValidators(Validators.required);
      formGroup.get('password')?.updateValueAndValidity();
    }
  }

  // State Management Methods
  setPagination(newPaginationData: Partial<PaginationData>) {
    const updatedPagination = {
      ...this.paginationDataState.value,
      ...newPaginationData,
    };

    this.paginationDataState.next(updatedPagination);
    this.getUsersAPI();
  }

  setSelectedData(user: User | null) {
    this.selectedDataState.next(user);
  }

  setCreationMode(isCreation: boolean) {
    this.isCreationModeState.next(isCreation);
    if (isCreation) {
      this.resetForm();
    }
  }

  get isCreationMode(): boolean {
    return this.isCreationModeState.value;
  }

  get isFormLoading(): boolean {
    return this.formLoadingState.value;
  }
}
