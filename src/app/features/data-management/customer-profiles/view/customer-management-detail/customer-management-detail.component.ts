import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  CustCaseHistory,
  CustomerManagementState,
  DetailData,
} from '../../state/customer-management-state';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-management-detail',
  templateUrl: './customer-management-detail.component.html',
  styleUrl: './customer-management-detail.component.scss',
  standalone: false,
})
export class CustomerManagementDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  isLoading: boolean = false;
  detailData: DetailData | null = null;

  // Pie Chart Data - Decision Distribution
  pieChartData: any;
  pieChartOptions: any;

  // Bar Chart Data - Severity Distribution
  barChartData: any;
  barChartOptions: any;

  // Scatter Chart Data - Risk Score vs Decision
  scatterChartData: any;
  scatterChartOptions: any;

  fieldsCases = [
    {
      key: 'id',
      type: 'text',
      align: 'left',
      width: '1%',
    },
    {
      key: 'riskScore',
      type: 'barLevel',
      align: 'left',
      width: '5%',
    },
    {
      key: 'status',
      type: 'tag',
      align: 'left',
      width: '1%',
    },
    {
      key: 'lastActivity',
      type: 'date',
      align: 'left',
      width: '1%',
    },
  ];
  fieldsAccounts = [
    {
      key: 'accountNumber',
      type: 'text',
      align: 'left',
      width: '5%',
    },
    {
      key: 'accountType',
      type: 'text',
      align: 'left',
      width: '5%',
    },
    {
      key: 'currency',
      type: 'text',
      align: 'left',
      width: '5%',
    },
    {
      key: 'firstTrxTime',
      type: 'date',
      align: 'left',
      width: '5%',
    },
    {
      key: 'lastTrxTime',
      type: 'date',
      align: 'left',
      width: '5%',
    },
    {
      key: 'status',
      type: 'accountStatus',
      align: 'left',
      width: '1%',
    },
  ];

  selectedCase: any = null;
  modalVisibility = false;

  constructor(
    private state: CustomerManagementState,
    private aRoute: ActivatedRoute,
  ) {}

  onView(event: any) {
    this.state.setSelectedCase(event);
    this.modalVisibility = true;
  }

  ngOnInit(): void {
    this.aRoute.queryParams.subscribe(({ id }) => {
      if (id) this.state.getCustomerAPI(id);
    });

    this.state.detailData$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data) {
        this.detailData = data;
        this.initializePieChart();
        this.initializeBarChart();
        this.initializeScatterChart();
      }
    });

    this.state.selectedCase$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.selectedCase = data;
        }
      });

    this.state.isLoading$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.isLoading = data;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'INVESTIGATING':
        return 'warning';
      case 'NEW':
        return 'primary';
      case 'CLOSED':
        return 'success';
      case 'RESOLVED':
        return 'success';
      default:
        return 'secondary';
    }
  }

  getRiskScoreColor(score: string): string {
    const scoreNum = Number(score);
    if (scoreNum >= 80) return 'danger';
    if (scoreNum >= 60) return 'warning';
    return 'success';
  }

  onUpdateStatus(): void {
    // Implementation for updating status
  }

  onChangeAccountStatus(event: any) {
    const payload = {
      id: event.data?.accountNumber,
      accountNumber: event.data?.accountNumber,
      reason: event.remark,
      status: event.status,
    };

    this.state.updateStatusCustomerAccountAPI(payload);
  }

  onViewCase(caseItem: CustCaseHistory): void {}

  initializePieChart() {
    // Check if data exists and is not empty
    if (
      !this.detailData?.trendTransactions ||
      this.detailData.trendTransactions.length === 0
    ) {
      this.pieChartData = {
        labels: ['No Data'],
        datasets: [
          {
            data: [1],
            backgroundColor: ['#e0e0e0'],
            hoverBackgroundColor: ['#d0d0d0'],
          },
        ],
      };

      this.pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Transaction Decisions Distribution - No Data Available',
          },
          tooltip: {
            enabled: false,
          },
        },
      };
      return;
    }

    // Count decisions
    const decisionCounts = this.detailData.trendTransactions.reduce(
      (acc, item) => {
        if (item.decision) {
          acc[item.decision] = (acc[item.decision] || 0) + 1;
        }
        return acc;
      },
      {} as any,
    );

    // Check if we have any valid decisions
    const hasData = Object.keys(decisionCounts).length > 0;

    if (!hasData) {
      this.pieChartData = {
        labels: ['No Valid Data'],
        datasets: [
          {
            data: [1],
            backgroundColor: ['#e0e0e0'],
            hoverBackgroundColor: ['#d0d0d0'],
          },
        ],
      };

      this.pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Transaction Decisions Distribution - No Valid Data',
          },
          tooltip: {
            enabled: false,
          },
        },
      };
      return;
    }

    // Define colors for each decision type
    const getDecisionColor = (decision: string) => {
      switch (decision) {
        case 'ALLOW':
          return '#4CAF50'; // Green
        case 'BLOCK':
          return '#f44336'; // Red
        case 'FLAG':
          return '#FF9800'; // Orange
        default:
          return '#9E9E9E'; // Gray for unknown decisions
      }
    };

    const getDecisionHoverColor = (decision: string) => {
      switch (decision) {
        case 'ALLOW':
          return '#45a049'; // Darker green
        case 'BLOCK':
          return '#da190b'; // Darker red
        case 'FLAG':
          return '#F57C00'; // Darker orange
        default:
          return '#757575'; // Darker gray
      }
    };

    const labels = Object.keys(decisionCounts);
    const backgroundColors = labels.map((label) => getDecisionColor(label));
    const hoverBackgroundColors = labels.map((label) =>
      getDecisionHoverColor(label),
    );

    this.pieChartData = {
      labels: labels,
      datasets: [
        {
          data: Object.values(decisionCounts),
          backgroundColor: backgroundColors,
          hoverBackgroundColor: hoverBackgroundColors,
        },
      ],
    };

    this.pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Transaction Decisions Distribution',
        },
      },
    };
  }

  initializeScatterChart() {
    // Check if data exists and is not empty
    if (
      !this.detailData?.trendTransactions ||
      this.detailData.trendTransactions.length === 0
    ) {
      this.scatterChartData = {
        datasets: [
          {
            label: 'No Data',
            data: [{ x: 0, y: 0 }],
            backgroundColor: '#e0e0e0',
            pointRadius: 8,
          },
        ],
      };

      this.scatterChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Risk Score by Decision - No Data Available',
          },
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Transaction Index',
            },
            min: 0,
            max: 1,
          },
          y: {
            title: {
              display: true,
              text: 'Risk Score',
            },
            beginAtZero: true,
            max: 100,
          },
        },
      };
      return;
    }

    // Group data by decision - filter out items with missing data
    const validTransactions = this.detailData.trendTransactions.filter(
      (item) =>
        item.decision &&
        item.riskScore !== undefined &&
        item.riskScore !== null,
    );

    if (validTransactions.length === 0) {
      this.scatterChartData = {
        datasets: [
          {
            label: 'No Valid Data',
            data: [{ x: 0, y: 0 }],
            backgroundColor: '#e0e0e0',
            pointRadius: 8,
          },
        ],
      };

      this.scatterChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Risk Score by Decision - No Valid Data',
          },
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Transaction Index',
            },
            min: 0,
            max: 1,
          },
          y: {
            title: {
              display: true,
              text: 'Risk Score',
            },
            beginAtZero: true,
            max: 100,
          },
        },
      };
      return;
    }

    // Separate data by decision type
    const allowData = validTransactions
      .filter((item) => item.decision === 'ALLOW')
      .map((item, index) => ({ x: index, y: item.riskScore }));

    const blockData = validTransactions
      .filter((item) => item.decision === 'BLOCK')
      .map((item, index) => ({ x: index, y: item.riskScore }));

    const flagData = validTransactions
      .filter((item) => item.decision === 'FLAG')
      .map((item, index) => ({ x: index, y: item.riskScore }));

    // Create datasets only for data that exists
    const datasets = [];

    if (allowData.length > 0) {
      datasets.push({
        label: 'ALLOW',
        data: allowData,
        backgroundColor: '#4CAF50', // Green
        pointRadius: 6,
      });
    }

    if (blockData.length > 0) {
      datasets.push({
        label: 'BLOCK',
        data: blockData,
        backgroundColor: '#f44336', // Red
        pointRadius: 6,
      });
    }

    if (flagData.length > 0) {
      datasets.push({
        label: 'FLAG',
        data: flagData,
        backgroundColor: '#FF9800', // Orange
        pointRadius: 6,
      });
    }

    // If no datasets, show empty state
    if (datasets.length === 0) {
      datasets.push({
        label: 'No Data Points',
        data: [{ x: 0, y: 0 }],
        backgroundColor: '#e0e0e0',
        pointRadius: 8,
      });
    }

    this.scatterChartData = {
      datasets: datasets,
    };

    this.scatterChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          display:
            datasets.length > 1 || datasets[0].label !== 'No Data Points',
        },
        title: {
          display: true,
          text:
            datasets.length === 1 && datasets[0].label === 'No Data Points'
              ? 'Risk Score by Decision - No Data Points'
              : 'Risk Score by Decision',
        },
        tooltip: {
          enabled: datasets[0].label !== 'No Data Points',
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Transaction Index',
          },
          beginAtZero: true,
        },
        y: {
          title: {
            display: true,
            text: 'Risk Score',
          },
          beginAtZero: true,
        },
      },
    };
  }

  initializeBarChart() {
    // Check if data exists and is not empty
    if (
      !this.detailData?.trendTransactions ||
      this.detailData.trendTransactions.length === 0
    ) {
      this.barChartData = {
        labels: ['No Data'],
        datasets: [
          {
            label: 'Count',
            data: [0],
            backgroundColor: ['#e0e0e0'],
            borderColor: ['#d0d0d0'],
            borderWidth: 1,
          },
        ],
      };

      this.barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Severity Level Distribution - No Data Available',
          },
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 1,
            ticks: {
              stepSize: 1,
            },
          },
        },
      };
      return;
    }

    // Count severity levels
    const severityCounts = this.detailData.trendTransactions.reduce(
      (acc, item) => {
        if (item.severity) {
          acc[item.severity] = (acc[item.severity] || 0) + 1;
        }
        return acc;
      },
      {} as any,
    );

    // Check if we have any valid severity data
    const hasData = Object.keys(severityCounts).length > 0;

    if (!hasData) {
      this.barChartData = {
        labels: ['No Valid Data'],
        datasets: [
          {
            label: 'Count',
            data: [0],
            backgroundColor: ['#e0e0e0'],
            borderColor: ['#d0d0d0'],
            borderWidth: 1,
          },
        ],
      };

      this.barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Severity Level Distribution - No Valid Data',
          },
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 1,
            ticks: {
              stepSize: 1,
            },
          },
        },
      };
      return;
    }

    this.barChartData = {
      labels: Object.keys(severityCounts),
      datasets: [
        {
          label: 'Count',
          data: Object.values(severityCounts),
          backgroundColor: [
            '#FFC107', // Amber for LOW
            '#FF9800', // Orange for MEDIUM
            '#f44336', // Red for HIGH
          ],
          borderColor: ['#FFA000', '#F57C00', '#d32f2f'],
          borderWidth: 1,
        },
      ],
    };

    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Severity Level Distribution',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
        },
      },
    };
  }

  hasChartData(): boolean {
    return !!(
      this.detailData?.trendTransactions &&
      this.detailData.trendTransactions.length > 0
    );
  }

  getStatusSeverity(status: string): any {
    if (status === 'ALLOW') return 'success';
    if (status === 'FLAGGED') return 'warn';
    if (status === 'BLOCKED') return 'danger';
  }

  getStatusValue(status: string): any {
    switch (status) {
      case 'ALLOW':
        return 'Allow';
      case 'FLAGGED':
        return 'Flagged';
      case 'BLOCKED':
        return 'Blocked';
      default:
        return 'Allow';
    }
  }
}
