import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {WhitelistAccount, WhitelistAccState} from "../../state/whitelist-acc-state";
import {PaginationData} from "../../../../../core/models/pagination";
import {AppState} from "../../../../../core/states/app-state";

@Component({
  selector: 'app-whitelist-acc-list',
  templateUrl: './whitelist-acc-list.component.html',
  styleUrl: './whitelist-acc-list.component.scss',
  standalone: false
})
export class WhitelistAccListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  headerName = 'Whitelist Accounts'
  isLoading: boolean = false;
  fields: any[] = [
    {
      'key': 'accountNo',
      'type': 'text',
      'align': 'left',
      'width': '40%'
    },
  ];

  blacklistAccounts: WhitelistAccount[] = [];
  paginationData: PaginationData;
  selectedData: WhitelistAccount | null = null;

  filterFormGroup: FormGroup = new FormGroup({});

  modalVisibility: boolean = false
  modeModal: "VIEW" | "MUTATION" = "VIEW"

  constructor(
    readonly appState: AppState,
    readonly state: WhitelistAccState,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.setupSubscriptions()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setupSubscriptions() {
    this.state.initializeFilterForm()

    this.state.isLoading$.pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.isLoading = loading;
      });

    this.state.whitelistState$.pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.blacklistAccounts = data;
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

    this.state.getWhitelistAccountAPI();
  }

  onFilter(event: any) {
    this.state.setPagination({
      first: event.first || 0,
      page: event.page || 1,
      rows: event.rows || 10
    });
  }

  onView(event: WhitelistAccount) {
    this.state.setSelectedData(event)
    this.modeModal = 'VIEW'
    this.modalVisibility = true
  }

  onAdd() {
    this.state.setSelectedData(null)
    this.state.initializeForm()
    this.modeModal = 'MUTATION'
    this.modalVisibility = true
  }

  onUpdate(event: WhitelistAccount[]) {
    this.state.setSelectedData(event[0])
    this.modeModal = 'MUTATION'
    this.modalVisibility = true
  }

  onDelete(event: WhitelistAccount[]) {
    this.state.deleteAPI(event)
  }

  onExport() {
    this.state.exportAPI({
      limit: 1000,
      offset: 0,
    })
  }

  onCloseModal() {
    this.modalVisibility = false
  }
}
