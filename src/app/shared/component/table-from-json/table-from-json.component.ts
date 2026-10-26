import { Component, Input, OnInit } from '@angular/core';
import {CurrencyPipe, DatePipe} from "@angular/common";

@Component({
  selector: 'app-table-from-json',
  templateUrl: './table-from-json.component.html',
  styleUrls: ['./table-from-json.component.scss'],
  standalone: false
})
export class TableFromJsonComponent implements OnInit {
  @Input() listName: any;
  @Input() data: any[] = [];

  headers: string[] = [];
  globalFilter: string[] = [];

  private readonly statusKeys = ['status'];
  private readonly severityMap = {
    success: ['COMPLETED', 'SUCCESS', 'ALLOWED'],
    warn: ['PENDING'],
    danger: ['BLOCKED', 'ERROR', 'FAILED']
  };

  constructor(
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.initializeTable();
  }

  private initializeTable(): void {
    if (this.data.length === 0) return;

    // Convert numeric zeros to string zeros and extract headers
    this.data.forEach(obj => {
      Object.keys(obj).forEach(key => {
        if (obj[key] === 0) obj[key] = '0';
      });
    });

    this.headers = Object.keys(this.data[0]);
    this.globalFilter = [...this.headers];
  }

  isStatusColumn(column: string): boolean {
    return this.statusKeys.includes(column.toLowerCase());
  }

  getStatusSeverity(value: string): 'success' | 'warn' | 'danger' | 'info' {
    for (const [severity, values] of Object.entries(this.severityMap)) {
      if (values.includes(value)) {
        return severity as 'success' | 'warn' | 'danger';
      }
    }
    return 'info';
  }

  hasUpdateFlag(value: any): boolean {
    return typeof value === 'string' && value.includes('(UPDATED)');
  }

  hasDeleteFlag(value: any): boolean {
    return typeof value === 'string' && value.includes('(DELETED)');
  }

  getDisplayValue(value: any, column: string): string {
    if (value == null) return '';

    // Clean the value first
    const cleanValue = this.cleanValue(value);

    // Apply appropriate pipe based on column name
    if (this.isAmountField(column)) {
      return this.formatCurrency(cleanValue);
    }

    if (this.isDateField(column)) {
      return this.formatDate(cleanValue);
    }

    return cleanValue;
  }

  private cleanValue(value: any): string {
    if (typeof value !== 'string') return String(value);
    return value.replace(/\s*\((UPDATED|DELETED)\)/g, '');
  }

  private isAmountField(column: string): boolean {
    const amountKeywords = ['amount', 'price', 'cost', 'value', 'balance', 'total', 'sum'];
    return amountKeywords.some(keyword =>
      column.toLowerCase().includes(keyword)
    );
  }

  private isDateField(column: string): boolean {
    const dateKeywords = ['date', 'time', 'created', 'updated', 'modified', 'timestamp'];
    return dateKeywords.some(keyword =>
      column.toLowerCase().includes(keyword)
    );
  }

  private formatCurrency(value: string): string {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return value;
    return this.currencyPipe.transform(numValue, 'IDR', 'symbol', '1.2-2') || value;
  }

  private formatDate(value: string): string {
    const date = new Date(value);
    if (isNaN(date.getTime())) return value;
    return this.datePipe.transform(date, 'MMM dd, yyyy HH:mm') || value;
  }
}
