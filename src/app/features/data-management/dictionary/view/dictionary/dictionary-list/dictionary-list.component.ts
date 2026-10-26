import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Dictionary} from "../../../model/dictionary";
import {PaginationData} from "../../../../../../core/models/pagination";
import {AppState} from "../../../../../../core/states/app-state";
import {DictionaryState} from "../../../state/dictionary-state";

@Component({
  selector: 'app-dictionary-list',
  templateUrl: './dictionary-list.component.html',
  styleUrl: './dictionary-list.component.scss',
  standalone: false
})
export class DictionaryListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  headerName = 'Dictionary'
  isLoading: boolean = false;
  fields: any[] = [
    {
      'key': 'id',
      'type': 'text',
      'align': 'left',
      'width': '2%'
    },
    {
      'key': 'name',
      'type': 'text',
      'align': 'left',
      'width': '2%'
    },
    {
      'key': 'tableName',
      'type': 'text',
      'align': 'left',
      'width': '2%'
    },
    {
      'key': 'type',
      'type': 'text',
      'align': 'left',
      'width': '2%'
    },
    {
      'key': 'description',
      'type': 'text',
      'align': 'left',
      'width': '2%'
    }
  ];

  dictionaries: Dictionary[] = [];
  paginationData: PaginationData;
  selectedData: Dictionary | null = null;

  filterFormGroup: FormGroup = new FormGroup({});

  modalVisibility: boolean = false
  modeModal: "VIEW" | "MUTATION" = "VIEW"

  constructor(
    readonly appState: AppState,
    readonly state: DictionaryState,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.setupSubscriptions()
  }

  ngOnDestroy(): void {
    this.state.hideModal()
    this.destroy$.next();
    this.destroy$.complete();
  }

  setupSubscriptions() {
    this.state.isLoading$.pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.isLoading = loading;
      });

    this.state.modalVisibility$.pipe(takeUntil(this.destroy$))
      .subscribe(modalVisibility => {
        this.modalVisibility = modalVisibility;
      });

    this.state.dictionaries$.pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.dictionaries = data;
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
      .subscribe(data => {
        this.filterFormGroup = data;
      });

    this.state.initializeFilterForm()

    this.state.getDictionariesAPI();
  }

  onView(event: Dictionary) {
    const {id} = event

    this.router.navigate(['data-management/dictionary/detail'], {
      queryParams: {
        id
      }
    })
  }

  onAdd() {
    this.modeModal = "MUTATION"
    this.state.clearColumn()
    this.state.setCreationMode(true)
    this.state.initializeForm()
    this.state.showModal()
  }

  onUpdate(event: Dictionary) {
    this.modeModal = "MUTATION"
    this.state.setCreationMode(false)
    this.state.initializeForm()
    this.state.setSelectedData(event)
    this.state.loadForm()
    this.state.showModal()
  }

  onDelete(event: any) {
    this.state.setSelectedData(event)
    this.state.deleteDictionaryAPI()
  }
}
