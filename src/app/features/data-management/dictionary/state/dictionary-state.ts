import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DictionaryDetailService } from '../service/dictionary-detail.service';
import { PaginationData } from '../../../../core/models/pagination';
import { AlertService } from '../../../../services/alert.service';
import { Dictionary, PreviewQuery } from '../model/dictionary';
// import { FilterData } from '../../../settings/channel/channel/model/model';
import { SelectOption } from '../../../../core/models/select-option';
import { DictionaryService } from '../service/dictionary.service';
import { DictionaryColumn } from '../model/dictionary-detail';

@Injectable({
  providedIn: 'root',
})
export class DictionaryState {
  private isLoadingState = new BehaviorSubject<boolean>(false);
  private isCreationModeState = new BehaviorSubject<boolean>(true);
  private modalVisibilityState = new BehaviorSubject<boolean>(false);
  private modeModalState = new BehaviorSubject<'VIEW' | 'MUTATION'>('VIEW');

  private dictionariesState = new BehaviorSubject<Dictionary[] | null>(null);
  private selectedDataState = new BehaviorSubject<Dictionary | null>(null);
  private paginationDataState = new BehaviorSubject<PaginationData>({
    first: 0,
    page: 1,
    rows: 10,
    totalRecord: 0,
  });
  private previewQueryState = new BehaviorSubject<PreviewQuery>(null);

  private columnsState = new BehaviorSubject<DictionaryColumn[]>(null);
  private countIgniteTableState = new BehaviorSubject<number>(0);

  private formGroupState = new BehaviorSubject<FormGroup | null>(null);
  private filterFormGroupState = new BehaviorSubject<FormGroup | null>(null);

  isLoading$ = this.isLoadingState.asObservable();
  isCreationMode$ = this.isCreationModeState.asObservable();
  modalVisibility$ = this.modalVisibilityState.asObservable();

  dictionaries$ = this.dictionariesState.asObservable();
  paginationData$ = this.paginationDataState.asObservable();
  selectedData$ = this.selectedDataState.asObservable();
  countIgniteTable$ = this.countIgniteTableState.asObservable();
  columns$ = this.columnsState.asObservable();

  formGroup$ = this.formGroupState.asObservable();
  filterFormGroup$ = this.filterFormGroupState.asObservable();

  previewQuery$ = this.previewQueryState.asObservable();

  typeList: SelectOption[] = [
    {
      label: 'Internal',
      value: 'INTERNAL',
    },
    {
      label: 'External',
      value: 'EXTERNAL',
    },
    {
      label: 'Calculation',
      value: 'CALCULATION',
    },
  ];

  constructor(
    private svc: DictionaryService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private alertSvc: AlertService,
  ) {}

  getDictionariesAPI(customFilter?: any) {
    this.isLoadingState.next(true);

    const filter = {
      ...this.filterFormGroupState?.value?.value,
    };

    this.svc.getAll(filter).subscribe({
      next: ({ records, totalRecord }) => {
        this.dictionariesState.next(records);
        this.paginationDataState.next({
          ...this.paginationDataState.value,
          totalRecord,
        });
        this.isLoadingState.next(false);
      },
      error: (err) => {
        console.error('Error loading dictionaries:', err);
        this.isLoadingState.next(false);
      },
    });
  }

  getPreviewQueryAPI(query: string) {
    this.previewQueryState.next(null);
    this.isLoadingState.next(true);

    this.svc.getPreviewQuery({ query }).subscribe({
      next: ({ data, columns }) => {
        const mappedColumns: any[] = [];
        columns?.map((v) => {
          mappedColumns.push({
            key: v.name,
            type: 'text',
            igniteType: v.type,
            align: 'left',
            width: '2%',
          });
        });
        this.previewQueryState.next({
          columns: mappedColumns,
          data,
        });

        this.isLoadingState.next(false);
      },
      error: (err) => {
        console.error('Error loading dictionaries:', err);
        this.isLoadingState.next(false);
      },
    });
  }

  getColumnsAPI() {
    this.columnsState.next(null);
    this.isLoadingState.next(true);
    this.svc.getColumns({ id: this.selectedDataState.value.id }).subscribe({
      next: ({ records }) => {
        records?.map((v) => {
          v.primaryKey = v.primaryKey == 1;
          v.notNull = v.notNull == 1;
        });
        this.columnsState.next(records);

        this.isLoadingState.next(false);
      },
      error: (err) => {
        this.isLoadingState.next(false);
      },
    });
  }

  countAPI() {
    this.countIgniteTableState.next(0);
    this.isLoadingState.next(true);
    this.svc
      .countIgniteData({ tableName: this.selectedDataState.value.tableName })
      .subscribe({
        next: ({ count }) => {
          if (count > 0) {
            this.disableForm();
          } else {
            this.enableForm();
          }

          this.countIgniteTableState.next(count);
          this.isLoadingState.next(false);
        },
        error: (err) => {
          this.isLoadingState.next(false);
        },
      });
  }

  deleteDictionaryAPI() {
    this.isLoadingState.next(true);

    const id = this.selectedDataState.value.id;

    if (!id) {
      this.isLoadingState.next(false);
      return;
    }

    const payload: any = {
      id,
    };

    this.svc.delete(payload).subscribe({
      next: () => {
        this.alertSvc.showSuccessDelete();
        this.getDictionariesAPI();
        this.isLoadingState.next(false);
      },
      error: (err) => {
        console.error('Error deleting context:', err);
        this.isLoadingState.next(false);
      },
    });
  }

  onSubmitAPI() {
    this.isLoadingState.next(true);

    const formGroup = this.formGroupState.value.value;

    const isCalculation = formGroup?.type === 'CALCULATION';

    const calculationColumns: any[] = [];

    if (isCalculation) {
      this.previewQueryState.value.columns.map((v) => {
        calculationColumns.push({
          name: v?.key,
          type: v?.igniteType,
          primaryKey: false,
          notNull: false,
        });
      });
    }

    const payload: any = {
      ...formGroup,
      canUpdateDDL: this.countIgniteTableState.value == 0,
    };

    if (isCalculation) payload.tableColumns = calculationColumns;

    const apiCall = this.isCreationModeState.value
      ? this.svc.create(payload)
      : this.svc.update(payload);

    apiCall.subscribe({
      next: (response) => {
        this.alertSvc.showSuccessSave();
        this.isLoadingState.next(false);
        this.getDictionariesAPI();
        this.hideModal();
      },
      error: (error) => {
        console.error('Error submitting context:', error);
        this.isLoadingState.next(false);
      },
    });
  }

  initializeForm() {
    const formGroup = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.maxLength(255)]],
      type: [
        this.typeList[0].value,
        [Validators.required, Validators.maxLength(255)],
      ],
      description: [null, [Validators.required, Validators.maxLength(500)]],
      tableName: [null],
      tableColumns: [null],
      queryScript: [null],
      canUpdateDDL: [true],
    });
    this.formGroupState.next(formGroup);
    this.previewQueryState.next(null);
  }

  initializeFilterForm(): void {
    const filterFormGroup = this.fb.group({
      name: [null],
      type: [null],
    });
    this.filterFormGroupState.next(filterFormGroup);
  }

  get chosenType(): 'INTERNAL' | 'EXTERNAL' | 'CALCULATION' {
    return this.formGroupState.value.value?.type;
  }

  applyFilter(): void {
    const filterFormGroup = this.filterFormGroupState.value;
    if (filterFormGroup) {
      const filterData = filterFormGroup.value;
      this.paginationDataState.next({
        ...this.paginationDataState.value,
        first: 0,
        page: 1,
      });
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

      this.getDictionariesAPI();
    }
  }

  setPagination(newPaginationData: Partial<PaginationData>) {
    const updatedPagination = {
      ...this.paginationDataState.value,
      ...newPaginationData,
    };

    this.paginationDataState.next(updatedPagination);
    this.getDictionariesAPI();
  }

  setSelectedData(context: Dictionary | null) {
    this.selectedDataState.next(context);
    this.isCreationModeState.next(context === null);
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

  loadForm() {
    const fg = this.formGroupState.value;
    if (!fg) this.initializeForm();

    fg.patchValue({
      ...this.selectedDataState.value,
    });
  }

  disableForm() {
    const fg = this.formGroupState.value;
    fg.get('tableName').disable();
    fg.get('tableName').updateValueAndValidity();
  }

  enableForm() {
    const fg = this.formGroupState.value;
    fg.get('tableName').enable();
    fg.get('tableName').updateValueAndValidity();
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

  clearColumn() {
    this.columnsState.next(null);
    this.countIgniteTableState.next(0);
  }

  get isCreationMode(): boolean {
    return this.isCreationModeState.value;
  }
}
