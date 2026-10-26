import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AlertLogService,
  AlertLog,
} from 'src/app/services/alert-log/alert-log.service';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-alert-logs',
  templateUrl: './alert-logs.component.html',
  styleUrls: ['./alert-logs.component.scss'],
  standalone: false,
})
export class AlertLogsComponent implements OnInit, OnDestroy {
  alertLogs: AlertLog[] = [];
  refreshSubscription?: Subscription;
  isLoadingAlerts = false;

  // View detail properties
  showDetailDialog = false;
  selectedAlert: any = null;

  // Permissions for table actions (only view is enabled)
  permissions = {
    canView: true,
    canCreate: false,
    canUpdate: false,
    canDelete: false,
  };

  // Pagination state
  paginationData = {
    first: 0,
    page: 1,
    rows: 10,
    totalRecord: 0,
  };

  alertLogFields: any[] = [
    {
      key: 'created_at',
      label: 'Timestamp',
      type: 'date',
      align: 'left',
      width: '15%',
    },
    {
      key: 'source_name',
      label: 'Source',
      type: 'text',
      align: 'left',
      width: '10%',
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
      label: 'Rules',
      type: 'number',
      align: 'center',
      width: '8%',
    },
    {
      key: 'rule_names',
      label: 'Triggered Rules',
      type: 'text',
      align: 'left',
      width: '25%',
    },
    {
      key: 'destination_names',
      label: 'Sent To',
      type: 'text',
      align: 'left',
      width: '32%',
    },
  ];

  constructor(private alertLogService: AlertLogService) {}

  ngOnInit(): void {
    console.log(
      '[AlertLogsComponent] ngOnInit() called - Component is loading!',
    );
    this.loadAlertLogs();

    // Auto-refresh every 10 seconds
    this.refreshSubscription = interval(10000)
      .pipe(
        switchMap(() =>
          this.alertLogService.getAll(
            this.paginationData.rows.toString(),
            this.paginationData.page.toString(),
          ),
        ),
      )
      .subscribe({
        next: (data) => {
          this.processAlertLogs(data.logs);
          this.paginationData.totalRecord = data.total;
        },
        error: (err) => console.error('Error refreshing alert logs:', err),
      });
  }

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe();
  }

  onPaging(event: any) {
    this.paginationData = {
      first: event.first || 0,
      page: event.page + 1 || 1, // PrimeNG uses 0-based page, backend uses 1-based
      rows: event.rows || 10,
      totalRecord: this.paginationData.totalRecord,
    };
    this.loadAlertLogs();
  }

  onViewDetail(alert: any) {
    this.selectedAlert = {
      ...alert,
      // Parse destinations_sent if it's a string
      destinations_sent:
        typeof alert.destinations_sent === 'string'
          ? JSON.parse(alert.destinations_sent)
          : alert.destinations_sent,
    };
    this.showDetailDialog = true;
  }

  formatPayload(payload: any): string {
    if (!payload) return 'No payload';

    try {
      const parsed =
        typeof payload === 'string' ? JSON.parse(payload) : payload;
      return JSON.stringify(parsed, null, 2);
    } catch (e) {
      return typeof payload === 'string' ? payload : JSON.stringify(payload);
    }
  }

  processAlertLogs(logs: AlertLog[]): void {
    this.alertLogs = logs.map((log) => {
      // Parse payload to extract key information
      let payload = log.payload;
      if (typeof payload === 'string') {
        try {
          payload = JSON.parse(payload);
        } catch (e) {
          payload = { raw: payload };
        }
      }

      // Extract meaningful preview from payload
      const payloadPreview =
        payload?.text ||
        payload?.message ||
        payload?.alert ||
        payload?.description ||
        payload?.title ||
        JSON.stringify(payload).substring(0, 100);

      // Parse destinations_sent to get destination names
      let destinations: any[] = [];
      if (log.destinations_sent) {
        try {
          destinations =
            typeof log.destinations_sent === 'string'
              ? JSON.parse(log.destinations_sent)
              : log.destinations_sent;
        } catch (e) {
          destinations = [];
        }
      }

      const destinationNames = destinations
        .map((d) => d.destination || d.name || 'Unknown')
        .join(', ');

      return {
        ...log,
        payload_preview: payloadPreview,
        destinations_count: destinations.length,
        destination_names: destinationNames || 'None',

        payload_obj: payload, // Keep parsed payload for detail view
      };
    });
  }

  loadAlertLogs(): void {
    console.log(
      '[AlertLogsComponent] loadAlertLogs() called with pagination:',
      this.paginationData,
    );
    this.isLoadingAlerts = true;
    this.alertLogService
      .getAll(
        this.paginationData.rows.toString(),
        this.paginationData.page.toString(),
      )
      .subscribe({
        next: (data) => {
          this.processAlertLogs(data.logs);
          this.paginationData.totalRecord = data.total;
          this.isLoadingAlerts = false;
        },
        error: (err) => {
          console.error('Error loading alert logs:', err);
          this.isLoadingAlerts = false;
        },
      });
  }
}
