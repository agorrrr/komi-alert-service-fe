import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DictionaryDetailService } from '../service/dictionary-detail.service';
import { DictionaryDetail } from '../model/dictionary-detail';
import { PaginationData } from '../../../../core/models/pagination';
import { AlertService } from '../../../../services/alert.service';
// import {FilterData} from "../../../settings/channel/channel/model/model";
import { getFilenameFromResponse } from '../../../../shared/utils/filename-header';

@Injectable({
  providedIn: 'root',
})
export class DictionaryDetailState {
  private isLoadingState = new BehaviorSubject<boolean>(false);
  private isCreationModeState = new BehaviorSubject<boolean>(true);
  private modalVisibilityState = new BehaviorSubject<boolean>(false);
  private modeModalState = new BehaviorSubject<'VIEW' | 'MUTATION'>('VIEW');

  private dictionaryDetailState = new BehaviorSubject<DictionaryDetail | null>(
    null,
  );
  private selectedDataState = new BehaviorSubject<any>(null);
  private paginationDataState = new BehaviorSubject<PaginationData>({
    first: 0,
    page: 1,
    rows: 10,
    totalRecord: 0,
  });

  private formGroupState = new BehaviorSubject<FormGroup | null>(null);
  private filterFormGroupState = new BehaviorSubject<FormGroup | null>(null);

  isLoading$ = this.isLoadingState.asObservable();
  isCreationMode$ = this.isCreationModeState.asObservable();
  modalVisibility$ = this.modalVisibilityState.asObservable();

  dictionaryDetail$ = this.dictionaryDetailState.asObservable();
  selectedData$ = this.selectedDataState.asObservable();
  paginationData$ = this.paginationDataState.asObservable();

  formGroup$ = this.formGroupState.asObservable();
  filterFormGroup$ = this.filterFormGroupState.asObservable();

  constructor(
    private svc: DictionaryDetailService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private alertSvc: AlertService,
  ) {}

  getDictionaryDetailAPI(customFilter?: any) {
    this.dictionaryDetailState.next(null);
    this.isLoadingState.next(true);

    const filterParams = {
      ...this.paginationDataState.value,
      ...customFilter,
    };

    this.svc.getAll(filterParams).subscribe({
      next: (data) => {
        this.dictionaryDetailState.next(data);
        this.isLoadingState.next(false);
      },
      error: (err) => {
        console.error('Error loading contexts:', err);
        this.isLoadingState.next(false);
      },
    });
  }

  deleteDictionaryDetailAPI() {
    this.isLoadingState.next(true);

    const values: any[] = this.selectedDataState.value;

    const payload: any = {
      id: this.dictionaryDetailState.value.dictionary.id,
      igniteTableName: this.dictionaryDetailState.value.dictionary.tableName,
      values,
    };

    this.svc.delete(payload).subscribe({
      next: () => {
        this.alertSvc.showSuccessDelete();
        this.getDictionaryDetailAPI({
          id: this.dictionaryDetailState.value.dictionary.id,
        });
        this.isLoadingState.next(false);
      },
      error: (err) => {
        console.error('Error deleting context:', err);
        this.isLoadingState.next(false);
      },
    });
  }

  onSubmitAPI(formData: any) {
    this.isLoadingState.next(true);

    const dictionary = this.dictionaryDetailState.value.dictionary;

    const payload: any = {
      id: dictionary.id,
      tableName: dictionary.tableName,
      oldData: this.selectedDataState.value,
      newData: formData,
    };

    const apiCall = this.isCreationModeState.value
      ? this.svc.create(payload)
      : this.svc.update(payload);

    apiCall.subscribe({
      next: (response) => {
        this.alertSvc.showSuccessSave();
        this.isLoadingState.next(false);
        this.getDictionaryDetailAPI({
          id: this.dictionaryDetailState.value.dictionary.id,
        });
        this.hideModal();
      },
      error: (error) => {
        console.error('Error submitting context:', error);
        this.isLoadingState.next(false);
        this.hideModal();
      },
    });
  }

  onSubmitImportAPI(file) {
    this.isLoadingState.next(true);
    if (!file) {
      console.error('No file selected for bulk upload');
      return;
    }

    const formData = new FormData();

    formData.append('dictionaryFile', file);
    formData.append(
      'dictionaryId',
      this.dictionaryDetailState.value.dictionary.id,
    );

    this.svc.import(formData).subscribe({
      next: (data) => {
        this.alertSvc.showSuccessSave();
        this.isLoadingState.next(false);
        this.hideModal();
        this.getDictionaryDetailAPI({
          id: this.dictionaryDetailState.value.dictionary.id,
        });
      },
      error: (err) => {
        this.isLoadingState.next(false);
      },
    });
  }

  onDownloadExampleAPI() {
    this.isLoadingState.next(true);

    this.svc
      .downloadExample({
        filename: `${this.dictionaryDetailState.value.dictionary.tableName.toUpperCase()}.csv`,
      })
      .subscribe({
        next: (response) => {
          const a = document.createElement('a');
          const url = window.URL.createObjectURL(response);
          a.href = url;
          a.download = `example-${this.dictionaryDetailState.value.dictionary.tableName.toUpperCase()}.csv`;
          a.click();
          window.URL.revokeObjectURL(url);
          this.isLoadingState.next(false);
        },
        error: (err) => {
          console.error('Error exporting Dictionary:', err);
          this.isLoadingState.next(false);
        },
      });
  }

  initializeForm(): void {
    this.selectedDataState.next(null);
  }

  initializeFilterForm(): void {
    const filterFormGroup = this.fb.group({});
    this.filterFormGroupState.next(filterFormGroup);
  }

  applyFilter(): void {
    const filterFormGroup = this.filterFormGroupState.value;
    if (filterFormGroup) {
      // const filterData = filterFormGroup.value as FilterData;

      this.paginationDataState.next({
        ...this.paginationDataState.value,
        first: 0,
        page: 1,
      });

      this.getDictionaryDetailAPI();
    }
  }

  clearFilter(): void {
    const filterFormGroup = this.filterFormGroupState.value;
    if (filterFormGroup) {
      filterFormGroup.reset({});

      this.paginationDataState.next({
        ...this.paginationDataState.value,
        first: 0,
        page: 1,
      });

      this.getDictionaryDetailAPI();
    }
  }

  setPagination(newPaginationData: Partial<PaginationData>) {
    const updatedPagination = {
      ...this.paginationDataState.value,
      ...newPaginationData,
    };

    this.paginationDataState.next(updatedPagination);
    this.getDictionaryDetailAPI();
  }

  setSelectedData(data: any) {
    this.selectedDataState.next(data);
  }

  showModal() {
    this.modalVisibilityState.next(true);
  }

  hideModal() {
    this.modalVisibilityState.next(false);
  }

  setModeModal(mode: 'VIEW' | 'MUTATION') {
    this.modeModalState.next(mode);
  }

  get modeModal() {
    return this.modeModalState.value;
  }

  loadFormWithData(data: any) {
    if (!this.formGroupState.value) {
      this.initializeForm();
    }

    this.setSelectedData(data);

    const formGroup = this.formGroupState.value;
    if (formGroup && data) {
      formGroup.patchValue({});
    }
  }

  setCreationMode(isCreation: boolean) {
    this.isCreationModeState.next(isCreation);
  }

  resetForm(): void {
    const formGroup = this.formGroupState.value;
    if (formGroup) {
      formGroup.reset();
      formGroup.patchValue({
        id: null,
        name: null,
        description: null,
      });
    }
  }

  markFormGroupTouched() {
    if (this.formGroupState.value) {
      Object.keys(this.formGroupState.value.controls).forEach((key) => {
        this.formGroupState.value!.get(key)?.markAsTouched();
      });
    }
  }

  get isCreationMode(): boolean {
    return this.isCreationModeState.value;
  }
}
