import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-transaction-table',
    templateUrl: './transaction-table.component.html',
    styleUrls: ['./transaction-table.component.scss'],
    standalone: false
})
export class TransactionTableComponent {
  @Input() headers: any[] = [];
  @Input() data: any[] = [];
  @Output() actionClicked: EventEmitter<any> = new EventEmitter<any>();

  globalFilter: any[] = [];
  
  onActionClick(item: any) {
    this.actionClicked.emit(item);
  }

  ngOnInit() {
    if (this.headers.length > 0) {
      this.headers.map((dt) => {
        this.globalFilter.push(dt.realKey);
      });
    }
  }
}
