import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {PaginationData} from "../../../../core/models/pagination";
import {HighRiskCountryService} from "../service/high-risk-country.service";

export interface country{
  code:string
  name:string
  risk: 'LOW' | 'MEDIUM' | 'HIGH'
}

@Injectable({
  providedIn: 'root'
})
export class HighRiskCountryState {
  private isLoadingState = new BehaviorSubject<boolean>(false);
  private countriesState = new BehaviorSubject<country[]>([]);
  private selectedDataState = new BehaviorSubject<country | null>(null);
  private paginationDataState = new BehaviorSubject<PaginationData>({
    first: 0,
    page: 1,
    rows: 10,
    totalRecord: 0
  });

  // Public observables
  countries$ = this.countriesState.asObservable();
  paginationData$ = this.paginationDataState.asObservable();
  selectedData$ = this.selectedDataState.asObservable();
  isLoading$ = this.isLoadingState.asObservable();

  constructor(
    private svc: HighRiskCountryService,
  ) {
  }

  // GENERIC PATTERN
  getHighRiskCountriesAPI() {
    this.isLoadingState.next(true);

    this.svc.getAll(this.paginationDataState.value)
      .subscribe({
        next: ({records, totalRecord}) => {
          this.countriesState.next(records);
          this.paginationDataState.next({...this.paginationDataState.value, totalRecord});
          this.isLoadingState.next(false);
        },
        error: err => {
          console.error('Error loading fraud rules:', err);
          this.isLoadingState.next(false);
        }
      });
  }

  setPagination(newPaginationData: Partial<PaginationData>) {
    const updatedPagination = {
      ...this.paginationDataState.value,
      ...newPaginationData
    };

    this.paginationDataState.next(updatedPagination);
    this.getHighRiskCountriesAPI();
  }

  setSelectedData(rule: country | null) {
    this.selectedDataState.next(rule);
  }
}
