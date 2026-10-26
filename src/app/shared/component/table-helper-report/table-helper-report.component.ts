import {DatePipe} from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {Router} from '@angular/router';
import {Table} from 'primeng/table';
import {UploadState} from 'src/app/core/base/bulk/bulk-upload-state-enum';
import {MetadataService} from 'src/app/services/metadata/metadata.service';
import {AlertModalService} from 'src/app/services/modal-service/AlertModalService';

@Component({
  selector: 'app-table-helper-report',
  templateUrl: './table-helper-report.component.html',
  styleUrls: ['./table-helper-report.component.scss'],
  standalone: false
})
export class TableHelperReportComponent {
  @Input() objectName: any;
  @Input() data: any[] = [];
  @Input() fields: any[] = [];
  @Input() acl: any;
  @Input() bankOu: any;
  @Input() totalRecord: number = 0;
  @Output() refreshEvent = new EventEmitter<any>();
  // @Output() addEvent = new EventEmitter<any>();
  @Output() viewEvent = new EventEmitter<any>();
  // @Output() updateEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();
  @Output() downloadEvent = new EventEmitter<any>();
  @Output() paggingEvent = new EventEmitter<any>();

  @ViewChild('dtTrx') dtTrx: Table;
  first: number = 0;
  page: number = 1;
  rows: number = 10;
  totalRecordTemp: number = 0;
  @Input() loading: boolean = false;

  filterValue: any;
  globalFilter: any[] = [];
  metadata: any;

  rowtable: any[] = [{label: '10', value: 10}, {label: '25', value: 25}, {label: '50', value: 50}, {
    label: '100',
    value: 100
  }]
  rowsPerPage: number = 10;

  dataPage: any = {
    page: 1,
    rows: 10,
    first: 0,
  }

  _selectedColumns: any[];

  dataReport: any[] = this.data.map(data => {
    data.reportDate = data.reportDate == null ? undefined : this.datePipe.transform(data.reportDate, 'dd/MM/yyyy HH:mm');
    data.completedDate = data.completedDate == null ? undefined : this.datePipe.transform(data.completedDate, 'dd/MM/yyyy HH:mm');
    return data;
  })

  constructor(
    public router: Router,
    readonly alertModalService: AlertModalService,
    readonly metadataService: MetadataService,
    readonly cdr: ChangeDetectorRef,
    readonly datePipe: DatePipe,
  ) {
  }

  public get uploadState(): typeof UploadState {
    return UploadState;
  }

  async ngOnInit() {
    this.metadata = this.metadataService.getMetadata();
    this.acl = this.metadataService.findMenuByUrlAcl(this.router.url);
    this.globalFilter = this.fields.map(data => {
      return data.key;
    })

    this._selectedColumns = this.fields.filter((elData: any) =>
      elData.key != "komiUniqueID" && elData.key != "id"
    );

    this.totalRecordTemp = this.totalRecord;
  }

  get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.fields.filter((col) => val.includes(col));
  }

  refresh(data: any) {
    this.refreshEvent.emit(data);
  }

  viewData(data: any) {
    this.viewEvent.emit(data);
  }

  // editData(data: any) {
  //     this.updateEvent.emit(data);
  // }

  deleteConfirm(data: any) {
    this.deleteEvent.emit(data);
  }

  // addData() {
  //     this.addEvent.emit();
  // }

  downloadFile(data: any) {
    this.downloadEvent.emit(data);
  }

  showAlert(data: any) {
    this.alertModalService.showAlert("Not Authorized for Different Organizational Unit!");
  }

  paggingData(data: any) {
    this.page = data.page + 1;
    data.page = this.page;
    this.rows = data.rows;
    this.first = data.first;
    this.paggingEvent.emit(data);
  }

  changeRowsPerPage(event: any) {
    let dataRow = {"page": 0, "first": 0, "rows": event.value, "pageCount": 5}
    this.paggingData(dataRow);
  }

  onFilter(event: any) {
    this.totalRecord = this.dtTrx.filteredValue ? this.dtTrx.filteredValue.length : this.data.length;
  }

  onSearchInput(): void {
    this.loading = true;
    setTimeout(() => {
      this.totalRecordTemp = this.totalRecordTemp == 0 ? this.totalRecord : this.totalRecordTemp;
      const inputValue = this.filterValue;

      if (inputValue == '') {
        this.totalRecord = this.totalRecordTemp;
        this.dtTrx.filterGlobal(inputValue, 'contains');
        this.loading = false;
      } else {
        this.dtTrx.filterGlobal(inputValue, 'contains');
        setTimeout(() => {
          this.loading = false;
          this.totalRecord = this.dtTrx.filteredValue ? this.dtTrx.filteredValue.length : this.data.length;
        }, 500);
      }
    }, 1000);
  }
}
