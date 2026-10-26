import {BehaviorSubject, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {PaginationData} from "../../../../core/models/pagination";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SelectOption} from "../../../../core/models/select-option";
import {CustomerManagementService} from "../service/customer-management.service";
import {AlertService} from "../../../../services/alert.service";
import {DatePipe, formatCurrency} from "@angular/common";

export interface Customer {
  customerList: CustomerData[]
  customerSummary: CustomerSummary
}

export interface CustomerData {
  id: string
  name: string
  birthDate: string
  email: string
  cif: string
  riskScore: string
  riskScoreUpdatedDate: string
  status: CustomerStatus
  lastActivity?: string | Date
  memberSince?: string | Date
  firstTrxTime?: string | Date
  lastTrxTime?: string | Date
}

export type CustomerStatus = "ALLOW" | "FLAGGED" | "BLOCKED"

export interface CustomerSummary {
  totalCustomer: number
  allowedCustomer: number
  flaggedCustomer: number
  blockedCustomer: number
}

export interface CustTransaction {
  transactionId: string
  transactionDate: string
  transactionType: string
  ipAddress: any
  sourceAccountNumber: string
  sourceAccountStatus: string
  sourceCountry: any
  destinationAccountNumber: any
  destinationAccountStatus: any
  destinationCountry: any
  status: string
  currency: string
  amount: number | string
  channel: any
  location: any
  balanceStatus: string
}

export interface CustFlag {
  id: string;
  name: string;
  type: 'HighAmount' | 'VelocityExceeded' | 'NewDevice' | 'SuspiciousPattern';
  active: boolean;
}

export interface CustCaseHistory {
  id: string;
  caseNumber: string;
  date: string;
  description: string;
  status: 'Open' | 'Closed' | 'Pending';
}

export interface DetailData {
  customer: CustomerData
  accounts: CustomerAccount[]
  customerRisk: {
    score: number
    trend: 'up' | 'down' | 'stable'
    velocityPercentage: number
    lastWeekAverage: number
    weekBeforeLastAverage: number
  }
  recentTransactions: CustTransaction[];
  trendTransactions: any[];
  casesHistory: any[];
}

export interface CustomerAccount {
  name: string
  accountNumber: string
  accountType: string | Date
  currency: string | Date
  lastTrxTime: string
  firstTrxTime: string
  status: 'ACTIVE'
}

interface FormData {
  id?: string | null;
  nationalId: string,
  name: string,
  birthDate: string,
  email: string,
  severity: string,
}

interface FilterData {
  name?: string | null;
  type?: string | null;
  phase?: string | null;
  riskLevel?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerManagementState {
  private isLoadingState = new BehaviorSubject<boolean>(false);
  private customerState = new BehaviorSubject<Customer | null>(null);
  private selectedDataState = new BehaviorSubject<CustomerData | null>(null);
  private selectedCaseState = new BehaviorSubject<any | null>(null);
  private detailDataState = new BehaviorSubject<DetailData | null>(null);
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
    name: null,
    type: null,
    phase: null,
    riskLevel: null
  });

  // Public observables
  customers$ = this.customerState.asObservable();
  paginationData$ = this.paginationDataState.asObservable();
  selectedData$ = this.selectedDataState.asObservable();
  selectedCase$ = this.selectedCaseState.asObservable();
  detailData$ = this.detailDataState.asObservable();
  isLoading$ = this.isLoadingState.asObservable();
  formGroup$ = this.formGroupState.asObservable();
  filterFormGroup$ = this.filterFormGroupState.asObservable();

  // Static options
  readonly status: SelectOption[] = [
    {label: 'Allow', value: 'ALLOW'},
    {label: 'Flagged', value: 'FLAGGED'},
    {label: 'Blocked', value: 'BLOCKED'}
  ];

  constructor(
    private svc: CustomerManagementService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private alertSvc: AlertService
  ) {
  }

  // GENERIC PATTERN
  getCustomersAPI() {
    this.isLoadingState.next(true);

    const filterData = this.filterDataState.value;

    const filterParams = {
      ...this.paginationDataState.value,
      ...filterData
    };

    this.svc.getAll(filterParams)
      .subscribe({
        next: ({records, customerSummary, totalRecord}) => {
          this.customerState.next({customerList: records, customerSummary});
          this.paginationDataState.next({...this.paginationDataState.value, totalRecord});
          this.isLoadingState.next(false);
        },
        error: err => {
          console.error('Error loading customers:', err);
          this.isLoadingState.next(false);
        }
      });
  }

  getCustomerAPI(id?: string) {
    this.isLoadingState.next(true);
    this.selectedDataState.next(null)
    this.detailDataState.next(null)

    this.svc.getById({id: this.selectedDataState?.value?.id || id}).subscribe({
      next: (existing: DetailData) => {
        existing.recentTransactions.map(v => {
          v.amount = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: v.currency
          }).format(Number(v.amount));

          delete v.currency
        })
        this.detailDataState.next(existing);
        this.isLoadingState.next(false);
      },
      error: (err) => {
        console.error('Error loading customer detail:', err);
        this.isLoadingState.next(false);
      }
    });
  }

  deleteCustomerAPI() {
    this.isLoadingState.next(true);
    const {id, name, status} = this.selectedDataState.value!;
    this.svc.delete({id, name, status})
      .subscribe({
        next: () => {
          this.alertSvc.showSuccessSaveAndWaitApproval();
          this.getCustomersAPI();
          this.isLoadingState.next(false);
        },
        error: err => {
          console.error('Error deleting customer:', err);
          this.isLoadingState.next(false);
        }
      });
  }

  updateStatusCustomerAPI(status: CustomerStatus, remark: string = '') {
    this.isLoadingState.next(true);
    const {id, name, email, birthDate,  lastActivity} = this.selectedDataState.value!;
    this.svc.updateStatus({id, name, email, birthDate,  status, remark, lastActivity})
      .subscribe({
        next: () => {
          this.alertSvc.showSuccessSaveAndWaitApproval();
          this.getCustomersAPI();
          this.isLoadingState.next(false);
        },
        error: err => {
          console.error('Error deleting customer:', err);
          this.isLoadingState.next(false);
        }
      });
  }

  updateStatusCustomerAccountAPI(payload:any) {
    this.isLoadingState.next(true);
    this.svc.updateStatusAccount(payload)
      .subscribe({
        next: () => {
          this.alertSvc.showSuccessSaveAndWaitApproval();
          this.getCustomersAPI();
          this.isLoadingState.next(false);
        },
        error: err => {
          console.error('Error deleting customer:', err);
          this.isLoadingState.next(false);
        }
      });
  }

  onSubmitUpdateAPI(): Observable<any> {
    this.formLoadingState.next(true);

    const formGroup = this.formGroupState.value;
    if (!formGroup || formGroup.invalid) {
      this.formLoadingState.next(false);
      throw new Error('Form is invalid');
    }

    const {name, email, birthDate} = formGroup.value as FormData;
    const {id, status, lastActivity} = this.selectedDataState.value

    const apiCall = this.svc.update({
      id, name, email, birthDate, status, lastActivity
    });

    return new Observable(observer => {
      apiCall.subscribe({
        next: () => {
          this.alertSvc.showSuccessSaveAndWaitApproval();
          observer.next({});
          observer.complete();
        },
        error: (error) => {
          this.formLoadingState.next(false);
          observer.error(error);
        }
      });
    });
  }

  initializeForm(): void {
    const formGroup = this.fb.group({
      id: [null],
      nationalId: [null],
      name: [null, Validators.required],
      birthDate: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
    });
    this.formGroupState.next(formGroup);
  }

  loadForm() {
    const formGroup = this.formGroupState.value;
    const selectedData = this.selectedDataState.value;
    if (!formGroup) {
      return;
    }

    if (!selectedData) {
      return;
    }

    const {name, birthDate, email} = this.selectedDataState.value


    formGroup.patchValue({
      name,
      birthDate: birthDate ? new Date(birthDate) : null,
      email
    })
  }

  // Filter Form Methods
  initializeFilterForm(): void {
    const filterFormGroup = this.fb.group({
      name: [null],
      cif: [null],
      accountNo: [null],
      status: [null],
    });
    this.filterFormGroupState.next(filterFormGroup);
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

      this.getCustomersAPI();
    }
  }

  clearFilter(): void {
    const filterFormGroup = this.filterFormGroupState.value;
    if (filterFormGroup) {
      filterFormGroup.reset();
      this.filterDataState.next({
        name: null,
        type: null,
        phase: null,
        riskLevel: null
      });

      // Reset pagination to first page when clearing filter
      this.paginationDataState.next({
        ...this.paginationDataState.value,
        first: 0,
        page: 1
      });

      this.getCustomersAPI();
    }
  }

  setPagination(newPaginationData: Partial<PaginationData>) {
    const updatedPagination = {
      ...this.paginationDataState.value,
      ...newPaginationData
    };

    this.paginationDataState.next(updatedPagination);
    this.getCustomersAPI();
  }

  setSelectedData(customer: CustomerData | null) {
    this.selectedDataState.next(customer);
  }

  setSelectedCase(data: any | null) {
    this.selectedCaseState.next(data);
  }

  loadFormData(id: string): void {
    this.selectedDataState.next(null);
    this.formLoadingState.next(true);
    this.getCustomerAPI(id);
  }

  get isCreationMode(): boolean {
    return this.isCreationModeState.value;
  }

  get isFormLoading(): boolean {
    return this.formLoadingState.value;
  }

  // Helper methods for UI

}
