import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppState} from "../../../../../../core/states/app-state";
import {ActivatedRoute, Router} from "@angular/router";
import {DictionaryDetailState} from "../../../state/dictionary-detail-state";
import {DictionaryDetail} from "../../../model/dictionary-detail";

@Component({
  selector: 'app-dictionary-detail-list',
  templateUrl: './dictionary-detail-list.component.html',
  styleUrl: './dictionary-detail-list.component.scss',
  standalone: false
})
export class DictionaryDetailListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  headerName = ''
  isLoading: boolean = false;
  fields: any[] = [];

  dictionaryDetail: DictionaryDetail = null;

  isCalculation: boolean = false

  isExternal: boolean = false

  filterFormGroup: FormGroup = new FormGroup({});

  modalVisibility: boolean = false
  modeModal: "VIEW" | "MUTATION" | "IMPORT" = "VIEW"

  constructor(
    readonly appState: AppState,
    readonly state: DictionaryDetailState,
    private formBuilder: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute,
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
    this.aRouter.queryParams.subscribe(({id}) => {
      if (id) {
        this.state.getDictionaryDetailAPI({id})
      }
    })

    this.state.isLoading$.pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.isLoading = loading;
      });

    this.state.modalVisibility$.pipe(takeUntil(this.destroy$))
      .subscribe(modalVisibility => {
        this.modalVisibility = modalVisibility;
      });

    this.state.dictionaryDetail$.pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        if (!data) {
          return
        }
        this.dictionaryDetail = data
        this.isCalculation = this.dictionaryDetail.dictionary.type === 'CALCULATION'
        this.isExternal = this.dictionaryDetail.dictionary.type === 'EXTERNAL'
      });

    this.state.filterFormGroup$.pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.filterFormGroup = data;
      });


  }

  onView(event: DictionaryDetail) {

  }

  onAdd() {
    this.headerName='addData'
    this.modeModal = "MUTATION"
    this.state.setCreationMode(true)
    this.state.initializeForm()
    this.state.showModal()
  }

  onExport() {

  }

  onImport() {
    this.headerName='importData'
    this.modeModal = "IMPORT"
    this.modalVisibility = true
  }

  onUpdate(event: DictionaryDetail) {
    this.headerName='editData'
    this.modeModal = "MUTATION"
    this.state.setCreationMode(false)
    this.state.loadFormWithData(event[0])
    this.state.showModal()
  }

  onDelete(event: any) {
    this.state.setSelectedData(event)
    this.state.deleteDictionaryDetailAPI()
  }
}
