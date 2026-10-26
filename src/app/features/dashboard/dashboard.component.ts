import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EnvService } from 'src/app/services/env/env.service';
import {
  AlertLogService,
  AlertLog,
} from 'src/app/services/alert-log/alert-log.service';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false,
})
export class DashboardComponent implements OnInit, OnDestroy {
  kibanaUrl: any;
  alertLogs: AlertLog[] = [];
  refreshSubscription?: Subscription;

  constructor(
    readonly sanitizer: DomSanitizer,
    readonly _env: EnvService,
    private alertLogService: AlertLogService,
  ) {}

  ngOnInit(): void {
    // const rawUrl = `${this._env.kibanaUrl}/app/dashboards#/view/${this._env.keyKibana.dashboard}?embed=true&_g=(refreshInterval:(pause:!t,value:60000),time:(from:now-15m,to:now))&_a=()&show-time-filter=true&hide-filter-bar=true`;
    // this.kibanaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);

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
  }

  loadAlertLogs(): void {
    this.alertLogService.getAll().subscribe({
      next: (data) => {
        this.alertLogs = data.logs.slice(0, 10); // Show latest 10
      },
      error: (err) => console.error('Error loading alert logs:', err),
    });
  }
}
