import {
  Component,
  Input,
  ChangeDetectorRef,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-table-from-json-bulk',
    templateUrl: './table-from-json-bulk.component.html',
    styleUrls: ['./table-from-json-bulk.component.scss'],
    standalone: false
})
export class TableFromJsonBulkComponent {
  @Input() listName: any;
  @Input() page_name: any;
  @Input() data: any[] = [];
  headers: any[] = [];
  globalFilter: any[] = [];

  rowtable: any[] = [
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
  ];
  rowsPerPage: number = 10;
  rows: number = 10;
index: any;
  constructor(readonly cdr: ChangeDetectorRef, readonly router: Router) {}
  async ngOnInit() {
    if (this.data.length > 0) {
      const keys = Object.keys(this.data[0].rawRequestData);
      let filteredKeys = keys.filter(
        (key) => !key.includes('@') && !key.includes('virtualAccountNumber')
      );
      if (this.page_name != 'Update Status Manual Debit') {
        filteredKeys.splice(1, 0, 'virtualAccountNumber');
      }

      filteredKeys.splice(1, 0, 'status');
      filteredKeys.splice(2, 0, 'responseMessage');

      if (filteredKeys.includes('numberOfBills')) {
        filteredKeys = filteredKeys.filter(
          (key) =>
            !key.includes('billCode') &&
            !key.includes('billNo') &&
            !key.includes('billName') &&
            !key.includes('billShortName') &&
            !key.includes('billSubCompany') &&
            !key.includes('billAmount') &&
            !key.includes('billDescription')

        );

        const maxScore = Math.max(
          ...this.data.map((item) => {
            const bills = Number(item.rawRequestData.numberOfBills);
            return typeof bills === 'number' && !isNaN(bills) ? bills : 0;
          })
        );

        if (maxScore > 0 && maxScore <= 20) {
          for (let i = 0; i < maxScore; i++) {
            filteredKeys.push('billCode' + i);
            filteredKeys.push('billNo' + i);
            filteredKeys.push('billName' + i);
            filteredKeys.push('billShortName' + i);
            filteredKeys.push('billSubCompany' + i);

            filteredKeys.push('billAmount' + i);
            filteredKeys.push('billDescriptionID' + i);
            filteredKeys.push('billDescriptionEN' + i);
          }
        }
      }
      
      this.headers = filteredKeys;
      this.globalFilter = filteredKeys;

      if (this.router.url === '/bulk/create-billing' || this.router.url === '/bulk/create-va') {
        for (const dt of this.data) {
          if (dt.rawResponseData.billDetails.length > 0) {
            dt.rawResponseData.billDetails.forEach((bd: any, index: number) => {
              dt.rawRequestData[`billCode${index}`] = bd.billCode;
            });
          }
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.cdr.detectChanges();
    }
  }

  changeRowsPerPage(event: any) {
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

  formatCamelCaseString(input: string): string {
    const result = input.replace(/([a-z])([A-Z])/g, '$1 $2');

    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  mapingLabel(item:any,column:any,index){
    if(column != 'status' && column != 'responseMessage'  && column != 'virtualAccounNo' && column != 'virtualAccountNumber'){
      return  item?.rawRequestData[column];
    }else if(column == 'status'){
      return item[column];
    }else if(column == 'responseMessage'){
      if(index == 2){
        return item[column];
      }else{
        return item?.rawRequestData[column];
      }
    }else if(column == 'virtualAccountNumber'){
      return item?.rawRequestData[column] ? item?.rawRequestData[column] : (item?.rawRequestData['prefix'] + item?.rawRequestData['CID'] + item?.rawRequestData['customerNo']);
    }
  }
}
