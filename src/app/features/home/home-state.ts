import { Injectable } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { PaginationData } from "src/app/core/models/pagination";
import { AlertService } from "src/app/services/alert.service";
import { HomeService } from "./home.service";

export interface ChartData {
    label: string[]
    data: number[]
}

export interface RecentFraudAlert {
    caseId: string
    komiId: string
    score: number
    createdDate: Date
}

export interface RiskRulePerformance {
    rulename: string
    triggers: number
    accuracy: number
    status: string
}

export interface HomeData {
    totalTransactions: number
    totalCases: number
    fraudDetected: number
    riskScoreAvg: number
    falsePositives: number
    recentFraudAlertData: RecentFraudAlert[]
    riskRulePerformance: RiskRulePerformance[]
}

@Injectable({
    providedIn: 'root'
})
export class HomeState {
    private isLoadingState = new BehaviorSubject<boolean>(false);
    private homeDataTableState = new BehaviorSubject<HomeData | null>(null);
    private paginationDataState = new BehaviorSubject<PaginationData>({
        first: 0,
        page: 1,
        rows: 10,
        totalRecord: 0
    });
    homeDataTable$ = this.homeDataTableState.asObservable();

    constructor(
        private svc: HomeService,
        private fb: FormBuilder,
        private alertSvc: AlertService
    ) { }

    // GENERIC PATTERN
    getDashboardAPI() {
        this.isLoadingState.next(true);

        this.svc.getDashboardData()
            .subscribe({
                next: (response: any) => {
                    const tempResponse: HomeData = response.data
                    this.homeDataTableState.next(tempResponse);
                    this.paginationDataState.next({
                        ...this.paginationDataState.value,
                        totalRecord: tempResponse?.recentFraudAlertData?.length || 0
                    });

                    this.isLoadingState.next(false);
                },
                error: err => {
                    console.error('Error loading dashboard data:', err);
                    this.alertSvc.showErrorCustom('Gagal memuat data dashboard');
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
    }
}
