import {Component, Input, OnInit} from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-view-data-from-json',
  templateUrl: './view-data-from-json.component.html',
  styleUrls: ['./view-data-from-json.component.scss'],
  standalone: false
})
export class ViewDataFromJsonComponent implements OnInit {
  @Input() data: any;

  ngOnInit(): void {}

  isPlainText(value: any): boolean {
    return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  isObject(value: any): boolean {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  containsUpdated(value: string): boolean {
    return typeof value === 'string' && value.includes('(UPDATED)');
  }

  formatValue(value: any): string {
    if (typeof value === 'string') {
      // Only accept specific date formats
      const date = moment(value, [
        'YYYY-MM-DD',
        'MM/DD/YYYY',
        'DD/MM/YYYY',
        'YYYY-MM-DD HH:mm:ss',
        'MM/DD/YYYY HH:mm:ss',
        'DD/MM/YYYY HH:mm:ss'
      ], true); // true = strict parsing

      if (date.isValid()) {
        return date.format('YYYY-MM-DD HH:mm:ss');
      }
    }

    return value;
  }

  protected readonly Object = Object;
}
