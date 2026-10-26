import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Rule } from '../../service/rule-management.service';
import {
  PaginationData,
  RuleManagementState,
} from '../../state/rule-management-state';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss'],
  standalone: false,
})
export class RuleListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  headerName = 'Rule Management';
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
      header: 'Name',
      type: 'text',
      align: 'left',
      width: '15%',
    },
    {
      key: 'source_names',
      header: 'Sources',
      type: 'text',
      align: 'left',
      width: '15%',
    },
    {
      key: 'destination_names',
      header: 'Destinations',
      type: 'text',
      align: 'left',
      width: '15%',
    },
    {
      key: 'created_at',
      type: 'date',
      align: 'left',
      width: '12%',
    },
  ];

  rules: Rule[] = [];
  paginationData: PaginationData = {
    first: 0,
    page: 1,
    rows: 10,
    totalRecord: 0,
  };
  selectedData: Rule | null = null;
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

  constructor(readonly state: RuleManagementState) {}

  ngOnInit(): void {
    this.state.initializeForm();
    this.state.initializeFilterForm();
    this.state.loadDropdowns(); // Load sources and destinations
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

    this.state.rules$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.rules = data;
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

    this.state.getRulesAPI();
  }

  onPaging(event: any) {
    this.state.setPagination({
      first: event.first || 0,
      page: event.page || 1,
      rows: event.rows || 10,
    });
  }

  onAdd() {
    this.isCreation = true;
    this.isView = false;
    this.state.setCreationMode(true);
    this.state.setSelectedData(null);
    this.state.enableForm();
    this.modalVisibility = true;
  }

  onUpdate(event: Rule) {
    this.isCreation = false;
    this.isView = false;
    this.state.setCreationMode(false);
    this.state.setSelectedData(event);
    this.state.loadForm();
    this.state.enableForm();
    this.modalVisibility = true;
  }

  onView(event: Rule) {
    this.isCreation = false;
    this.isView = true;
    this.state.setCreationMode(false);
    this.state.setSelectedData(event);
    this.state.loadForm();
    this.state.disableForm();
    this.modalVisibility = true;
  }

  onDelete(event: Rule) {
    this.state.setSelectedData(event);
    this.state.deleteRuleAPI();
  }

  onSuccess() {
    this.modalVisibility = false;
    this.state.setSelectedData(null);
  }
}
