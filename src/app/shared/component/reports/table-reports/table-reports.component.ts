import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReportTableData } from 'src/app/models/reports/report-table-data';

@Component({
    selector: 'app-table-reports',
    templateUrl: './table-reports.component.html',
    styleUrls: ['./table-reports.component.scss'],
    standalone: false
})
export class TableReportsComponent {
  @Input() data: ReportTableData[] = [];
  @Output() actionClicked: EventEmitter<any> = new EventEmitter<any>();
  reportData: ReportTableData[] = [];

  
  onActionClick(item: any) {
    this.actionClicked.emit(item);
  }

  ngOnInit() {
    this.reportData = this.data;
  }
}
