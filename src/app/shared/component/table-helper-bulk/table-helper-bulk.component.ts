import {
  Input,
  ViewChild,
  Output,
  EventEmitter,
  Component,
  ChangeDetectorRef,
} from '@angular/core';
import { AlertModalService } from 'src/app/services/modal-service/AlertModalService';
import { MetadataService } from 'src/app/services/metadata/metadata.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Table } from 'primeng/table';
import { UploadState } from 'src/app/core/base/bulk/bulk-upload-state-enum';

@Component({
    selector: 'app-table-helper-bulk',
    templateUrl: './table-helper-bulk.component.html',
    styleUrls: ['./table-helper-bulk.component.scss'],
    standalone: false
})
export class TableHelperBulkComponent {
  @Input() objectName: any;
  @Input() data: any[] = [];
  @Input() fields: any[] = [];
  @Input() acl: any;
  @Input() bankOu: any;
  @Input() totalRecord: number = 0;
  @Input() monitorPage: any;
  @Output() refreshEvent = new EventEmitter<any>();
  @Output() addEvent = new EventEmitter<any>();
  @Output() previewEvent = new EventEmitter<any>();
  @Output() updateEvent = new EventEmitter<any>();
  @Output() cancelEvent = new EventEmitter<any>();
  @Output() downloadEvent = new EventEmitter<any>();
  @Output() downloadRequestEvent = new EventEmitter<any>();
  @Output() downloadResponseEvent = new EventEmitter<any>();
  @Output() submitEvent = new EventEmitter<any>();

  @Output() paggingEvent = new EventEmitter<any>();

  @ViewChild('dtTrx') dtTrx: Table;

  items: any[];
  first: number = 0;
  page: number = 0;
  rows: number = 10;
  totalRecordTemp: number = 0;
  loading: boolean = false;

  filterValue: any;
  globalFilter: any[] = [];
  metadata: any;

  rowtable: any[] = [
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
  ];
  rowsPerPage: number = 10;

  dataPage: any = {
    page: 0,
    rows: 10,
    first: 0,
  };

  dataReport: any[] = this.data.map((data) => {
    data.reportDate =
      data.reportDate == null
        ? undefined
        : this.datePipe.transform(data.reportDate, 'dd/MM/yyyy HH:mm');
    data.completedDate =
      data.completedDate == null
        ? undefined
        : this.datePipe.transform(data.completedDate, 'dd/MM/yyyy HH:mm');
    return data;
  });
  validStatus: {};

  constructor(
    public router: Router,
    readonly alertModalService: AlertModalService,
    readonly metadataService: MetadataService,
    readonly cdr: ChangeDetectorRef,
    readonly datePipe: DatePipe
  ) {}

  public get uploadState(): typeof UploadState {
    return UploadState;
  }

  async ngOnInit() {
    this.metadata = this.metadataService.getMetadata();
    this.acl = this.metadataService.findMenuByUrlAcl(this.router.url);
    this.globalFilter = this.fields.map((data) => {
      return data.key;
    });

    this.totalRecordTemp = this.totalRecord;
  }

  refresh(data: any) {
    this.refreshEvent.emit(data);
  }

  submitData(data: any) {
    this.submitEvent.emit(data);
  }

  previewData(data: any) {
    this.previewEvent.emit(data);
  }

  downloadRequest(data: any) {
    this.downloadRequestEvent.emit(data);
  }

  downloadResponse(data: any) {
    this.downloadResponseEvent.emit(data);
  }

  editData(data: any) {
    this.updateEvent.emit(data);
  }

  cancelConfirm(data: any) {
    this.cancelEvent.emit(data);
  }

  addData() {
    this.addEvent.emit();
  }

  downloadFile(data: any) {
    this.downloadEvent.emit(data);
  }

  showAlert(data: any) {
    this.alertModalService.showAlert(
      'Not Authorized for Different Organizational Unit!'
    );
  }

  paggingData(data: any) {
    this.page = data.page;
    data.page = this.page;
    this.rows = data.rows;
    this.first = data.first;
    this.paggingEvent.emit(data);
  }

  changeRowsPerPage(event: any) {
    let dataRow = { page: 0, first: 0, rows: event.value, pageCount: 5 };
    this.paggingData(dataRow);
  }

  onFilter(event: any) {
    this.totalRecord = this.dtTrx.filteredValue
      ? this.dtTrx.filteredValue.length
      : this.data.length;
  }

  onSearchInput(): void {
    this.loading = true;
    setTimeout(() => {
      this.totalRecordTemp =
        this.totalRecordTemp == 0 ? this.totalRecord : this.totalRecordTemp;
      const inputValue = this.filterValue;

      if (inputValue == '') {
        this.totalRecord = this.totalRecordTemp;
        this.dtTrx.filterGlobal(inputValue, 'contains');
        this.loading = false;
      } else {
        this.dtTrx.filterGlobal(inputValue, 'contains');
        setTimeout(() => {
          this.loading = false;
          this.totalRecord = this.dtTrx.filteredValue
            ? this.dtTrx.filteredValue.length
            : this.data.length;
        }, 500);
      }
    }, 1000);
  }

  checkStatus(status: string, button: string): boolean {
    if (button == 'submit' && status == this.uploadState.RECEIVED) {
      return true;
    } else if (
      button == 'preview' &&
      status != this.uploadState.UPLOAD_IN_PROGRESS
    ) {
      return true;
    } else if (button == 'download' && status == this.uploadState.COMPLETED) {
      return true;
    } else if (button == 'cancel' && status == this.uploadState.RECEIVED) {
      return true;
    } else {
      return false;
    }
  }

  getStatusTag(
    item: any,
    columnKey: string
  ): { severity: 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast'; value: string } | null {
    const status = item[columnKey];
    switch (status) {
      case 'UPLOADED':
        return { severity: 'success', value: 'Upload In Progress' };
      case 'INPROGRESS':
        return { severity: 'success', value: 'In Progress' };
      case 'IN-PROGRESS':
        return { severity: 'success', value: 'In Progress' };
      case 'SUBMIT':
        return { severity: 'success', value: 'In Progress' };
      case 'COMPLETED':
        return { severity: 'success', value: 'Complete' };
      case 'RECEIVED':
        return { severity: 'info', value: 'Received' };
      case 'WAITING-APPROVAL':
        return { severity: 'warn', value: 'Waiting Approval' };
      case 'REJECTED':
        return { severity: 'danger', value: 'Rejected' };
      case 'CANCELED':
        return { severity: 'danger', value: 'Canceled' };
      case 'FAILED':
        return { severity: 'danger', value: 'Failed' };
      default:
        return null;
    }
  }
}
