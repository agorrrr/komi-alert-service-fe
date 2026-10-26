import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Rule,
  RuleManagementService,
  CreateRuleDTO,
  UpdateRuleDTO,
} from '../service/rule-management.service';
import {
  SourceManagementService,
  Source,
} from '../../source-management/service/source-management.service';
import {
  DestinationManagementService,
  Destination,
} from '../../destination-management/service/destination-management.service';
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
export class RuleManagementState {
  private isLoadingState = new BehaviorSubject<boolean>(false);
  private rulesState = new BehaviorSubject<Rule[]>([]);
  private selectedDataState = new BehaviorSubject<Rule | null>(null);
  private paginationDataState = new BehaviorSubject<PaginationData>({
    first: 0,
    page: 1,
    rows: 10,
    totalRecord: 0,
  });

  // Dropdown options
  private sourcesState = new BehaviorSubject<Source[]>([]);
  private destinationsState = new BehaviorSubject<Destination[]>([]);

  // Public accessors for dropdowns
  sources$ = this.sourcesState.asObservable();
  destinations$ = this.destinationsState.asObservable();

  // Form-related state
  private formGroupState = new BehaviorSubject<FormGroup | null>(null);
  private isCreationModeState = new BehaviorSubject<boolean>(true);
  private formLoadingState = new BehaviorSubject<boolean>(false);

  // Filter form state
  private filterFormGroupState = new BehaviorSubject<FormGroup | null>(null);

  // Public observables
  rules$ = this.rulesState.asObservable();
  paginationData$ = this.paginationDataState.asObservable();
  selectedData$ = this.selectedDataState.asObservable();
  isLoading$ = this.isLoadingState.asObservable();
  formGroup$ = this.formGroupState.asObservable();
  filterFormGroup$ = this.filterFormGroupState.asObservable();

  constructor(
    private svc: RuleManagementService,
    private sourceSvc: SourceManagementService,
    private destinationSvc: DestinationManagementService,
    private fb: FormBuilder,
    private alertSvc: AlertService,
  ) {}

  // API Methods
  getRulesAPI() {
    this.isLoadingState.next(true);
    const { rows, page } = this.paginationDataState.value;

    this.svc.getAll(rows.toString(), page.toString()).subscribe({
      next: ({ rules, total }) => {
        this.rulesState.next(rules);
        this.paginationDataState.next({
          ...this.paginationDataState.value,
          totalRecord: total,
        });
        this.isLoadingState.next(false);
      },
      error: (err) => {
        console.error('Error loading rules:', err);
        this.isLoadingState.next(false);
      },
    });
  }

  loadDropdowns() {
    forkJoin({
      sources: this.sourceSvc.getAll(),
      destinations: this.destinationSvc.getAll(),
    }).subscribe({
      next: ({ sources, destinations }) => {
        this.sourcesState.next(sources.sources);
        this.destinationsState.next(destinations.destinations);
      },
      error: (err) => {
        console.error('Error loading dropdowns:', err);
      },
    });
  }

  createRuleAPI(): Observable<any> {
    this.formLoadingState.next(true);

    const formGroup = this.formGroupState.value;
    if (!formGroup || formGroup.invalid) {
      this.formLoadingState.next(false);
      throw new Error('Form is invalid');
    }

    const {
      name,
      source_ids,
      destination_ids,
      filter_criteria,
      message_template,
    } = formGroup.value;

    const payload: CreateRuleDTO = {
      name,
      source_ids,
      destination_ids,
      filter_criteria,
      message_template,
    };

    return new Observable((observer) => {
      this.svc.create(payload).subscribe({
        next: () => {
          this.alertSvc.showSuccessCustom('Rule created successfully');
          this.getRulesAPI();
          this.formLoadingState.next(false);
          observer.next({});
          observer.complete();
        },
        error: (error) => {
          this.formLoadingState.next(false);
          this.alertSvc.showErrorCustom(
            error?.error?.message || 'Failed to create rule',
          );
          observer.error(error);
        },
      });
    });
  }

  updateRuleAPI(): Observable<any> {
    this.formLoadingState.next(true);

    const formGroup = this.formGroupState.value;
    const selectedData = this.selectedDataState.value;

    if (!formGroup || formGroup.invalid || !selectedData) {
      this.formLoadingState.next(false);
      throw new Error('Form is invalid or no rule selected');
    }

    const {
      name,
      source_ids,
      destination_ids,
      filter_criteria,
      message_template,
    } = formGroup.value;

    const payload: UpdateRuleDTO = {
      name,
      source_ids,
      destination_ids,
      filter_criteria,
      message_template,
    };

    return new Observable((observer) => {
      this.svc.update(selectedData.id, payload).subscribe({
        next: () => {
          this.alertSvc.showSuccessCustom('Rule updated successfully');
          this.getRulesAPI();
          this.formLoadingState.next(false);
          observer.next({});
          observer.complete();
        },
        error: (error) => {
          this.formLoadingState.next(false);
          this.alertSvc.showErrorCustom(
            error?.error?.message || 'Failed to update rule',
          );
          observer.error(error);
        },
      });
    });
  }

  deleteRuleAPI() {
    this.isLoadingState.next(true);
    const selectedData = this.selectedDataState.value;

    if (!selectedData) {
      this.isLoadingState.next(false);
      return;
    }

    this.svc.delete(selectedData.id).subscribe({
      next: () => {
        this.alertSvc.showSuccessCustom('Rule deleted successfully');
        this.getRulesAPI();
        this.isLoadingState.next(false);
      },
      error: (err) => {
        console.error('Error deleting rule:', err);
        this.alertSvc.showErrorCustom(
          err?.error?.message || 'Failed to delete rule',
        );
        this.isLoadingState.next(false);
      },
    });
  }

  // Form Methods
  initializeForm(): void {
    const formGroup = new FormGroup({
      name: new FormControl(''),
      source_ids: new FormControl([], Validators.required),
      destination_ids: new FormControl([], Validators.required),
      filter_criteria: new FormControl('', Validators.required),
      message_template: new FormControl(''),
    });
    this.formGroupState.next(formGroup);
  }

  initializeFilterForm(): void {
    const filterFormGroup = this.fb.group({
      source_name: [null],
      destination_name: [null],
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
      name: selectedData.name,
      id: selectedData.id,
      source_ids: selectedData.source_ids || [],
      destination_ids: selectedData.destination_ids || [],
      filter_criteria: selectedData.filter_criteria || null,
      message_template: selectedData.message_template,
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
    this.getRulesAPI();
  }

  setSelectedData(rule: Rule | null) {
    this.selectedDataState.next(rule);
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
