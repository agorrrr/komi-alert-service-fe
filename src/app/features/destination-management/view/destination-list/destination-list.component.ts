import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Destination } from '../../service/destination-management.service';
import {
  PaginationData,
  DestinationManagementState,
} from '../../state/destination-management-state';

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrl: './destination-list.component.scss',
  standalone: false,
})
export class DestinationListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  headerName = 'Destination Management';
  isLoading: boolean = false;

  fields: any[] = [
    {
      key: 'id',
      type: 'text',
      align: 'left',
      width: '5%',
    },
    {
      key: 'name',
      type: 'text',
      align: 'left',
      width: '25%',
    },
    {
      key: 'type',
      type: 'text',
      align: 'left',
      width: '15%',
    },

    {
      key: 'created_at',
      type: 'date',
      align: 'left',
      width: '17.5%',
    },
    {
      key: 'updated_at',
      type: 'date',
      align: 'left',
      width: '17.5%',
    },
  ];

  destinations: Destination[] = [];
  paginationData: PaginationData = {
    first: 0,
    page: 1,
    rows: 10,
    totalRecord: 0,
  };
  selectedData: Destination | null = null;
  filterFormGroup: FormGroup = new FormGroup({});

  modalVisibility: boolean = false;
  isCreation: boolean = false;
  isView: boolean = false;

  permissions = {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: true,
    canView: true,
    canApprove: false,
    useApproval: false,
  };

  constructor(readonly state: DestinationManagementState) { }

  ngOnInit(): void {
    this.state.initializeForm();
    this.state.initializeFilterForm();
    this.setupSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setupSubscriptions() {
    this.state.isLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => {
        this.isLoading = loading;
      });

    this.state.destinations$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.destinations = data;
      });

    this.state.paginationData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.paginationData = data;
      });

    this.state.selectedData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.selectedData = data;
      });

    this.state.filterFormGroup$
      .pipe(takeUntil(this.destroy$))
      .subscribe((formGroup) => {
        if (formGroup) {
          this.filterFormGroup = formGroup;
        }
      });

    this.state.getDestinationsAPI();
  }

  onPaging(event: any) {
    this.state.setPagination({
      first: event.first || 0,
      page: event.page || 1,
      rows: event.rows || 10,
    });
  }

  onView(event: Destination) {
    this.isCreation = false;
    this.isView = true;
    this.state.setCreationMode(false);
    this.state.setSelectedData(event);
    this.state.loadForm();
    this.state.disableForm();
    this.modalVisibility = true;
  }

  onAdd() {
    this.isCreation = true;
    this.isView = false;
    this.state.setCreationMode(true);
    this.state.setSelectedData(null);
    this.state.enableForm();
    this.modalVisibility = true;
  }

  onUpdate(event: Destination) {
    this.isCreation = false;
    this.isView = false;
    this.state.setCreationMode(false);
    this.state.setSelectedData(event);
    this.state.loadForm();
    this.state.enableForm();
    this.modalVisibility = true;
  }

  onDelete(event: Destination) {
    this.state.setSelectedData(event);
    this.state.deleteDestinationAPI();
  }

  onSuccess() {
    this.modalVisibility = false;
    this.state.setSelectedData(null);
  }

  getChatId(destination: Destination): string {
    return destination.config?.chat_id || '-';
  }
}
