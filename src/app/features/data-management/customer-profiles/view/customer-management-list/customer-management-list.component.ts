import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {PaginationData} from "../../../../../core/models/pagination";
import {FormGroup} from "@angular/forms";
import {AppState} from "../../../../../core/states/app-state";
import {Router} from "@angular/router";
import {Customer, CustomerData, CustomerManagementState, CustomerStatus} from "../../state/customer-management-state";

@Component({
  selector: 'app-customer-management-list',
  templateUrl: './customer-management-list.component.html',
  styleUrl: './customer-management-list.component.scss',
  standalone: false
})
export class CustomerManagementListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  headerName = 'Customer Profiles'
  isLoading: boolean = false;
  fields: any[] = [
    {
      'key': 'id',
      'type': 'text',
      'align': 'left',
      'width': '1%'
    },
    {
      'key': 'name',
      'type': 'text',
      'align': 'left',
      'width': '3%'
    },
    {
      'key': 'cif',
      'type': 'text',
      'align': 'left',
      'width': '3%'
    },
    {
      'key': 'email',
      'type': 'text',
      'align': 'left',
      'width': '3%'
    },
    {
      'key': 'riskScore',
      'type': 'barLevel',
      'align': 'left',
      'width': '5%'
    },
    {
      'key': 'status',
      'type': 'customerStatus',
      'align': 'left',
      'width': '1%'
    },
    {
      'key': 'lastActivity',
      'type': 'date',
      'align': 'left',
      'width': '1%'
    }
  ];

  customer: Customer = null;
  paginationData: PaginationData;
  selectedData: CustomerData | null = null;

  filterFormGroup: FormGroup = new FormGroup({});

  modalVisibility: boolean = false
  isCreation: boolean = false

  constructor(
    readonly appState: AppState,
    readonly state: CustomerManagementState,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.state.initializeForm()
    this.state.initializeFilterForm()
    this.setupSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setupSubscriptions() {
    this.state.isLoading$.pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.isLoading = loading;
      });

    this.state.customers$.pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.customer = data;
      });

    this.state.paginationData$.pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.paginationData = data;
      });

    this.state.selectedData$.pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.selectedData = data;
      });

    this.state.filterFormGroup$.pipe(takeUntil(this.destroy$))
      .subscribe(formGroup => {
        if (formGroup) {
          this.filterFormGroup = formGroup;
        }
      });

    this.state.getCustomersAPI();
  }

  onSubmitFilter() {

  }

  onPaging(event: any) {
    this.state.setPagination({
      first: event.first || 0,
      page: event.page || 1,
      rows: event.rows || 10
    });
  }

  onView(event: CustomerData) {
    this.router.navigate(['/data-management/customer-profiles/detail'],
      {
        queryParams: {
          id: event.id
        }
      })
  }

  onAdd() {
    this.isCreation = true
  }

  onUpdate(event: CustomerData) {
    this.isCreation = false
    this.state.setSelectedData(event || null)
    this.state.loadForm()
    this.modalVisibility = true
  }

  onDelete(event: CustomerData) {
    this.state.setSelectedData(event)
    this.state.deleteCustomerAPI()
  }

  onChangeStatus(event: any) {
    const {data, status, remark} = event
    this.state.setSelectedData(data)
    this.state.updateStatusCustomerAPI(status, remark)
  }

  onSuccess() {
    this.modalVisibility = false
    this.state.setSelectedData(null)
  }

}
