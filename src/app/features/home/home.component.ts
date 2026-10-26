import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { of, Subject, takeUntil, interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EnvService } from 'src/app/services/env/env.service';
import { MetadataService } from 'src/app/services/metadata/metadata.service';
import { HomeData, HomeState } from './home-state';
import {
  AlertLogService,
  AlertLog,
} from 'src/app/services/alert-log/alert-log.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  userInfo: any = {};
  isFetchData: boolean = false;
  listImageFeatures: any[] | null | undefined = [];
  listImageFeatures$ = of(this.listImageFeatures);
  titleHeader: string | null | undefined = null;
  articleTpl: string | null | undefined = null;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  lastActivities: any[] | undefined;
  favPages: any[] | undefined;
  quickAcccess: { url: string; menu: string; module: string; icon: string }[];
  basePathIcon: string = 'assets/images/apps';
  homeData: HomeData | null = null;
  dataLineChart: any;
  optionsLineChart: any;
  dataPieChart: any;
  optionsPieChart: any;
  lineChartUrl: SafeResourceUrl;

  // Alert Logs
  alertLogs: AlertLog[] = [];
  refreshSubscription?: Subscription;
  isLoadingAlerts = false;
  alertLogFields: any[] = [
    {
      key: 'created_at',
      label: 'Timestamp',
      type: 'date',
      align: 'left',
      width: '20%',
    },
    {
      key: 'source_name',
      label: 'Source',
      type: 'text',
      align: 'left',
      width: '15%',
    },
    {
      key: 'status',
      label: 'Status',
      type: 'text',
      align: 'center',
      width: '10%',
    },
    {
      key: 'matched_rules',
      label: 'Matched Rules',
      type: 'number',
      align: 'center',
      width: '10%',
    },
    {
      key: 'destinations_count',
      label: 'Destinations',
      type: 'number',
      align: 'center',
      width: '10%',
    },
  ];

  isLoading = false;

  fields: any[] = [
    {
      key: 'ruleName',
      type: 'text',
      align: 'left',
      width: '20%',
    },
    {
      key: 'triggers',
      type: 'text',
      align: 'left',
      width: '1%',
    },
    {
      key: 'status',
      type: 'text',
      align: 'left',
      width: '1%',
    },
  ];

  constructor(
    readonly translate: TranslateService,
    readonly metadataService: MetadataService,
    readonly router: Router,
    readonly state: HomeState,
    readonly envService: EnvService,
    readonly sanitizer: DomSanitizer,
    private alertLogService: AlertLogService,
  ) {}

  ngOnInit(): void {
    this.home = {
      icon: 'pi pi-home',
      routerLink: '/',
    };

    this.setupQuickAccess();
    const path =
      'app/dashboards#/view/700143c8-6330-44a0-8d3f-54ecb76f2d49?embed=true&_g=(refreshInterval:(pause:!t,value:60000),time:(from:now-7h%2Fd,to:now))&_a=()&hide-filter-bar=true"';

    this.state.getDashboardAPI();

    this.state.homeDataTable$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.homeData = data;
      });

    // Load alert logs
    this.loadAlertLogs();

    // Auto-refresh every 10 seconds
    this.refreshSubscription = interval(10000)
      .pipe(switchMap(() => this.alertLogService.getAll()))
      .subscribe({
        next: (data) => {
          this.alertLogs = data.logs.slice(0, 10); // Show latest 10
        },
        error: (err) => console.error('Error refreshing alert logs:', err),
      });
  }

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAlertLogs(): void {
    this.isLoadingAlerts = true;
    this.alertLogService.getAll().subscribe({
      next: (data) => {
        this.processAlertLogs(data.logs.slice(0, 10));
        this.isLoadingAlerts = false;
      },
      error: (err) => {
        console.error('Error loading alert logs:', err);
        this.isLoadingAlerts = false;
      },
    });
  }

  processAlertLogs(logs: AlertLog[]): void {
    this.alertLogs = logs.map((log) => ({
      ...log,
      destinations_count: log.destinations_sent?.length || 0,
    }));
  }

  _refreshData() {
    this.setupQuickAccess();
  }

  setupQuickAccess() {
    this.quickAcccess = [
      {
        url: '/fraud-management/action-management/form',
        menu: this.translate.instant('createAction'),
        module: 'Fraud Management',
        icon: `pi pi-book`,
      },
      {
        url: '/fraud-management/scenario/form',
        menu: this.translate.instant('createScenario'),
        module: 'Fraud Management',
        icon: `pi pi-book`,
      },
      {
        url: '/fraud-management/dynamic-fraud-rule/form',
        menu: this.translate.instant('createDfr'),
        module: 'Fraud Management',
        icon: `pi pi-book`,
      },
    ];
    const filter = this.quickAcccess.filter((dt) => {
      let aclRes = this.metadataService.checkMenuByUrlAcl(dt.url);

      if (aclRes?.read == 1) {
        return true;
      } else {
        return false;
      }
    });
    this.quickAcccess = filter;
  }

  redirect(key: any) {
    this.router.navigate([`${key.url}`]);
  }

  onPaging(event: any) {
    this.state.setPagination({
      first: event.first || 0,
      page: event.page || 1,
      rows: event.rows || 10,
    });
  }

  onView(event: any) {
    this.router.navigate(['/customer-profiles/detail'], {
      queryParams: { id: event.id },
    });
  }
}
