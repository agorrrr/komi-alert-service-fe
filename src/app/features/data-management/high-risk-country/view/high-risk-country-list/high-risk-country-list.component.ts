import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from "../../../../../core/states/app-state";
import {country, HighRiskCountryState} from "../../state/high-risk-country-state";
import {Subject, takeUntil} from "rxjs";
import {PaginationData} from "../../../../../core/models/pagination";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-high-risk-country-list',
  templateUrl: './high-risk-country-list.component.html',
  styleUrl: './high-risk-country-list.component.scss',
  standalone: false
})
export class HighRiskCountryListComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();
  headerName = 'High Risk Country'
  isLoading: boolean = false;
  fields: any[] =  [
    {
      'key': 'code',
      'type': 'text',
      'align': 'left',
      'width': '2%'
    },
    {
      'key': 'name',
      'type': 'text',
      'align': 'left',
      'width': '5%'
    },
    {
      'key': 'risk',
      'type': 'text',
      'align': 'left',
      'width': '2%'
    }
  ];

  countries: country[] = [];
  paginationData: PaginationData;
  selectedData: country | null = null;

  filterFormGroup: FormGroup = new FormGroup({});

  modalVisibility: boolean = false

  constructor(
    readonly appState: AppState,
    readonly state: HighRiskCountryState,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.buildForm()

    this.setupSubscriptions()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  buildForm() {
    this.filterFormGroup = this.formBuilder.group({})
  }

  setupSubscriptions(){
    this.state.isLoading$.pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.isLoading = loading;
      });

    this.state.countries$.pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.countries = data;
      });

    this.state.paginationData$.pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.paginationData = data;
      });

    this.state.selectedData$.pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.selectedData = data;
      });

    this.state.getHighRiskCountriesAPI();
  }

  onFilter(event: any) {
    this.state.setPagination({
      first: event.first || 0,
      page: event.page || 1,
      rows: event.rows || 10
    });
  }

  onView(event: country) {
    this.state.setSelectedData(event)
    this.modalVisibility = true
  }
}
