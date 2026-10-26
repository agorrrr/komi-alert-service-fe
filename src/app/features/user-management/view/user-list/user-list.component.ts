import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { User } from '../../service/user-management.service';
import {
  PaginationData,
  UserManagementState,
} from '../../state/user-management-state';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  standalone: false,
})
export class UserListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  headerName = 'User Management';
  isLoading: boolean = false;

  fields: any[] = [
    {
      key: 'id',
      type: 'text',
      align: 'left',
      width: '5%',
    },
    {
      key: 'username',
      type: 'text',
      align: 'left',
      width: '25%',
    },
    {
      key: 'email',
      type: 'text',
      align: 'left',
      width: '30%',
    },
    {
      key: 'created_at',
      type: 'date',
      align: 'left',
      width: '20%',
    },
    {
      key: 'updated_at',
      type: 'date',
      align: 'left',
      width: '20%',
    },
  ];

  users: User[] = [];
  paginationData: PaginationData = {
    first: 0,
    page: 1,
    rows: 10,
    totalRecord: 0,
  };
  selectedData: User | null = null;
  filterFormGroup: FormGroup = new FormGroup({});

  modalVisibility: boolean = false;
  isCreation: boolean = false;

  permissions = {
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: true,
    canView: true,
    canApprove: false,
    useApproval: false,
  };

  constructor(readonly state: UserManagementState) {}

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

    this.state.users$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.users = data;
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

    this.state.getUsersAPI();
  }

  onPaging(event: any) {
    this.state.setPagination({
      first: event.first || 0,
      page: event.page || 1,
      rows: event.rows || 10,
    });
  }

  onView(event: User) {
    // Can implement detail view if needed
  }

  onAdd() {
    this.isCreation = true;
    this.state.setCreationMode(true);
    this.state.setSelectedData(null);
    this.modalVisibility = true;
  }

  onUpdate(event: User) {
    this.isCreation = false;
    this.state.setCreationMode(false);
    this.state.setSelectedData(event);
    this.state.loadForm();
    this.modalVisibility = true;
  }

  onDelete(event: User) {
    this.state.setSelectedData(event);
    this.state.deleteUserAPI();
  }

  onSuccess() {
    this.modalVisibility = false;
    this.state.setSelectedData(null);
  }
}
