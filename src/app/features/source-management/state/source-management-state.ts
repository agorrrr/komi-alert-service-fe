import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Source,
  SourceManagementService,
  CreateSourceDTO,
  UpdateSourceDTO,
} from '../service/source-management.service';
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
export class SourceManagementState {
  private isLoadingState = new BehaviorSubject<boolean>(false);
  private sourcesState = new BehaviorSubject<Source[]>([]);
  private selectedDataState = new BehaviorSubject<Source | null>(null);
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
  sources$ = this.sourcesState.asObservable();
  paginationData$ = this.paginationDataState.asObservable();
  selectedData$ = this.selectedDataState.asObservable();
  isLoading$ = this.isLoadingState.asObservable();
  formGroup$ = this.formGroupState.asObservable();
  filterFormGroup$ = this.filterFormGroupState.asObservable();

  // Source type options
  sourceTypes = [
    { label: 'Grafana', value: 'grafana' },
    { label: 'Dynatrace', value: 'dynatrace' },
    { label: 'Elastic', value: 'elastic' },
    { label: 'Prometheus', value: 'prometheus' },
    { label: 'Manual/API', value: 'manual' },
  ];

  constructor(
    private svc: SourceManagementService,
    private fb: FormBuilder,
    private alertSvc: AlertService,
  ) {}

  // API Methods
  getSourcesAPI() {
    this.isLoadingState.next(true);
    const { rows, page } = this.paginationDataState.value;

    this.svc.getAll(rows.toString(), page.toString()).subscribe({
      next: ({ sources, total }) => {
        this.sourcesState.next(sources);
        this.paginationDataState.next({
          ...this.paginationDataState.value,
          totalRecord: total,
        });
        this.isLoadingState.next(false);
      },
      error: (err) => {
        console.error('Error loading sources:', err);
        this.isLoadingState.next(false);
      },
    });
  }

  createSourceAPI(): Observable<any> {
    this.formLoadingState.next(true);

    const formGroup = this.formGroupState.value;
    if (!formGroup || formGroup.invalid) {
      this.formLoadingState.next(false);
      throw new Error('Form is invalid');
    }

    const { name, type, secret_key } = formGroup.value;
    const payload: CreateSourceDTO = {
      name,
      type,
      secret_key: secret_key || undefined,
    };

    return new Observable((observer) => {
      this.svc.create(payload).subscribe({
        next: () => {
          this.alertSvc.showSuccessCustom('Source created successfully');
          this.getSourcesAPI();
          this.formLoadingState.next(false);
          observer.next({});
          observer.complete();
        },
        error: (error) => {
          this.formLoadingState.next(false);
          this.alertSvc.showErrorCustom(
            error?.error?.message || 'Failed to create source',
          );
          observer.error(error);
        },
      });
    });
  }

  updateSourceAPI(): Observable<any> {
    this.formLoadingState.next(true);

    const formGroup = this.formGroupState.value;
    const selectedData = this.selectedDataState.value;

    if (!formGroup || formGroup.invalid || !selectedData) {
      this.formLoadingState.next(false);
      throw new Error('Form is invalid or no source selected');
    }

    const { name, type, secret_key } = formGroup.value;
    const payload: UpdateSourceDTO = {
      name,
      type,
      secret_key: secret_key || undefined,
    };

    return new Observable((observer) => {
      this.svc.update(selectedData.id, payload).subscribe({
        next: () => {
          this.alertSvc.showSuccessCustom('Source updated successfully');
          this.getSourcesAPI();
          this.formLoadingState.next(false);
          observer.next({});
          observer.complete();
        },
        error: (error) => {
          this.formLoadingState.next(false);
          this.alertSvc.showErrorCustom(
            error?.error?.message || 'Failed to update source',
          );
          observer.error(error);
        },
      });
    });
  }

  deleteSourceAPI() {
    this.isLoadingState.next(true);
    const selectedData = this.selectedDataState.value;

    if (!selectedData) {
      this.isLoadingState.next(false);
      return;
    }

    this.svc.delete(selectedData.id).subscribe({
      next: () => {
        this.alertSvc.showSuccessCustom('Source deleted successfully');
        this.getSourcesAPI();
        this.isLoadingState.next(false);
      },
      error: (err) => {
        console.error('Error deleting source:', err);
        this.alertSvc.showErrorCustom(
          err?.error?.message || 'Failed to delete source',
        );
        this.isLoadingState.next(false);
      },
    });
  }

  // Form Methods
  initializeForm(): void {
    const formGroup = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      type: [null, Validators.required],
      secret_key: [null], // Optional
    });
    this.formGroupState.next(formGroup);
  }

  initializeFilterForm(): void {
    const filterFormGroup = this.fb.group({
      name: [null],
      type: [null],
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
      name: selectedData.name,
      type: selectedData.type,
      secret_key: selectedData.secret_key || null,
    });
  }

  resetForm() {
    const formGroup = this.formGroupState.value;
    if (formGroup) {
      formGroup.reset();
    }
  }

  // State Management Methods
  setPagination(newPaginationData: Partial<PaginationData>) {
    const updatedPagination = {
      ...this.paginationDataState.value,
      ...newPaginationData,
    };

    this.paginationDataState.next(updatedPagination);
    this.getSourcesAPI();
  }

  setSelectedData(source: Source | null) {
    this.selectedDataState.next(source);
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

  enableForm() {
    this.formGroupState.value?.enable();
  }

  disableForm() {
    this.formGroupState.value?.disable();
  }
}
