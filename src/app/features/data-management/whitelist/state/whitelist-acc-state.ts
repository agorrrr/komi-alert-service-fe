import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {WhitelistAccService} from "../service/whitelist-acc.service";
import {PaginationData} from "../../../../core/models/pagination";
import {AlertService} from "../../../../services/alert.service";
import {getFilenameFromResponse} from "../../../../shared/utils/filename-header";

interface formData {
  accountNo?: string
  file?: any
}

interface FilterData {
  accountNo: string
}

export interface WhitelistAccount {
  accountNo: string
}

@Injectable({
  providedIn: 'root'
})
export class WhitelistAccState {
  private isLoadingState = new BehaviorSubject<boolean>(false);
  private whitelistAccountState = new BehaviorSubject<WhitelistAccount[]>([]);
  private selectedDataState = new BehaviorSubject<WhitelistAccount>(null);
  private paginationDataState = new BehaviorSubject<PaginationData>({
    first: 0,
    page: 1,
    rows: 10,
    totalRecord: 0
  });

  // Form-related state
  private formGroupState = new BehaviorSubject<FormGroup | null>(null);
  private isCreationModeState = new BehaviorSubject<boolean>(true);
  private formLoadingState = new BehaviorSubject<boolean>(false);

  // Filter form state
  private filterFormGroupState = new BehaviorSubject<FormGroup | null>(null);
  private filterDataState = new BehaviorSubject<FilterData>({
    accountNo: null,
  });


  // Public observables
  whitelistState$ = this.whitelistAccountState.asObservable();
  paginationData$ = this.paginationDataState.asObservable();
  selectedData$ = this.selectedDataState.asObservable();
  isLoading$ = this.isLoadingState.asObservable();
  formGroup$ = this.formGroupState.asObservable();
  filterFormGroup$ = this.filterFormGroupState.asObservable();

  constructor(
    private svc: WhitelistAccService,
    private fb: FormBuilder,
    private alertSvc: AlertService
  ) {
  }

  // GENERIC PATTERN
  getWhitelistAccountAPI() {
    this.isLoadingState.next(true);

    const filterData = this.filterDataState.value;

    const filterParams = {
      ...this.paginationDataState.value,
      ...filterData
    };

    this.svc.getAll(filterParams)
      .subscribe({
        next: ({records, totalRecord}) => {
          this.whitelistAccountState.next(records);
          this.paginationDataState.next({...this.paginationDataState.value, totalRecord});
          this.isLoadingState.next(false);
        },
        error: err => {
          console.error('Error loading ruleBased:', err);
          this.isLoadingState.next(false);
        }
      });
  }

  createAPI() {
    this.isLoadingState.next(true);

    const {newAccountNo} = this.formGroupState.value.value

    this.svc.create({accountNo: newAccountNo})
      .subscribe({
        next: () => {
          this.alertSvc.showSuccessSave()
          this.getWhitelistAccountAPI();
          this.isLoadingState.next(false);
        },
        error: err => {
          console.error('Error deleting scenario:', err);
          this.isLoadingState.next(false);
        }
      });
  }

  createBulkAPI() {
    this.isLoadingState.next(true);

    const formValue = this.formGroupState.value.value;
    const file = formValue.blacklistFile;

    if (!file) {
      console.error('No file selected for bulk upload');
      this.isLoadingState.next(false);
      return;
    }

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('whitelistFile', file);

    this.svc.createBulk(formData)
      .subscribe({
        next: (response) => {
          this.alertSvc.showSuccessSave();
          this.getWhitelistAccountAPI();
          this.isLoadingState.next(false);
          this.formGroupState.value?.reset();
        },
        error: err => {
          this.alertSvc.showErrorCustom('Failed to upload file. Please try again.');
          this.isLoadingState.next(false);
        }
      });
  }

  updateAPI() {
    this.isLoadingState.next(true);

    const {accountNo} = this.selectedDataState.value

    const {newAccountNo} = this.formGroupState.value.value

    this.svc.update({id: accountNo, accountNo: newAccountNo})
      .subscribe({
        next: () => {
          this.alertSvc.showSuccessSave()
          this.getWhitelistAccountAPI();
          this.isLoadingState.next(false);
        },
        error: err => {
          console.error('Error deleting scenario:', err);
          this.isLoadingState.next(false);
        }
      });
  }

  deleteAPI(payload: any[]) {
    this.isLoadingState.next(true);

    this.svc.delete(payload)
      .subscribe({
        next: () => {
          this.alertSvc.showSuccessDelete()
          this.getWhitelistAccountAPI();
          this.isLoadingState.next(false);
        },
        error: err => {
          console.error('Error deleting scenario:', err);
          this.isLoadingState.next(false);
        }
      });
  }

  exportAPI(payload: any) {
    this.isLoadingState.next(true);

    this.svc.export(payload)
      .subscribe({
        next: (response: any) => {
          const blob = response.body

          const filename = getFilenameFromResponse(response) || `whitelist_accounts-${new Date().toLocaleString()}.csv`;

          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          link.click();
          window.URL.revokeObjectURL(url);

          this.alertSvc.showSuccessCustom("Success Export Whitelist Accounts");
          this.isLoadingState.next(false);
        },
        error: err => {
          console.error('Error exporting scenario:', err);
          this.isLoadingState.next(false);
        }
      });
  }



  initializeForm(): void {
    const formGroup = this.fb.group({
      mode: ['SINGLE'],
      newAccountNo: [''],
      blacklistFile: [''],
    });

    this.formGroupState.next(formGroup);
  }

  initializeFilterForm(): void {
    const filterFormGroup = this.fb.group({
      name: [null],
      phase: [null],
      riskLevel: [null],
      executionMode: [null],
    });
    this.filterFormGroupState.next(filterFormGroup);
  }

  setPagination(newPaginationData: Partial<PaginationData>) {
    const updatedPagination = {
      ...this.paginationDataState.value,
      ...newPaginationData
    };

    this.paginationDataState.next(updatedPagination);
    this.getWhitelistAccountAPI();
  }

  setSelectedData(data: WhitelistAccount) {
    this.selectedDataState.next(data);
  }

  applyFilter(): void {
    const filterFormGroup = this.filterFormGroupState.value;
    if (filterFormGroup) {
      const filterData = filterFormGroup.value as FilterData;
      this.filterDataState.next(filterData);

      // Reset pagination to first page when applying filter
      this.paginationDataState.next({
        ...this.paginationDataState.value,
        first: 0,
        page: 1
      });

      this.getWhitelistAccountAPI();
    }
  }

  clearFilter(): void {
    const filterFormGroup = this.filterFormGroupState.value;
    if (filterFormGroup) {
      filterFormGroup.reset();
      this.filterDataState.next({
        accountNo: null,
      });

      // Reset pagination to first page when clearing filter
      this.paginationDataState.next({
        ...this.paginationDataState.value,
        first: 0,
        page: 1
      });

      this.getWhitelistAccountAPI();
    }
  }
}
