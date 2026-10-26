import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef,
  OnChanges, SimpleChanges
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {TranslatePipe} from "@ngx-translate/core";

export interface FieldConfig {
  key: string;
  required: boolean;
  type: 'text' | 'dropdown' | 'checkbox';
  label?: string;
  dropdownOptions?: any[];
}

@Component({
  selector: 'app-table-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    ButtonModule,
    TranslatePipe
  ],
  template: `
    <div class="table-input-container small-font">
      <p-table [value]="tableData" [scrollable]="false" [tableStyle]="{ 'min-width': '50rem' }">
        <ng-template pTemplate="header">
          <tr>
            <th *ngFor="let field of fields">{{ field.label || (field.key | translate) }} <span *ngIf="field.required"
                                                                                                style="color:red">*</span>
            </th>
            <th style="width: 100px">Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-row let-rowIndex="rowIndex">
          <tr>
            <td *ngFor="let field of fields">
              <!-- Text Input -->
              <input
                *ngIf="field.type === 'text'"
                type="text"
                pInputText
                class="w-full"
                [(ngModel)]="row[field.key]"
                (ngModelChange)="onDataChange()"
                [disabled]="disabled"
              />

              <!-- Dropdown -->
              <p-dropdown
                appendTo="body"
                *ngIf="field.type === 'dropdown'"
                [options]="field.dropdownOptions || []"
                [(ngModel)]="row[field.key]"
                (ngModelChange)="onDataChange()"
                placeholder="Select"
                [disabled]="disabled"
              ></p-dropdown>

              <!-- Checkbox -->
              <p-checkbox
                *ngIf="field.type === 'checkbox'"
                [(ngModel)]="row[field.key]"
                (ngModelChange)="onDataChange()"
                [binary]="true"
                [disabled]="disabled"
              ></p-checkbox>
            </td>
            <td>
              <p-button
                icon="pi pi-trash"
                severity="danger"
                [text]="true"
                (onClick)="removeRow(rowIndex)"
                [disabled]="disabled"
              ></p-button>
            </td>
          </tr>
        </ng-template>
      </p-table>

      <div class="mt-3">
        <p-button
          label="Add Row"
          icon="pi pi-plus"
          (onClick)="addRow()"
          [disabled]="disabled"
        ></p-button>
      </div>
    </div>
  `,
  styles: [`
    .table-input-container {
      padding: 1rem;
    }

    .p-table {
      overflow: hidden !important;
    }

    td {
      padding: 0 1rem !important;
    }
  `]
})
export class TableInputComponent implements OnInit, OnChanges {
  @Input() fields: FieldConfig[] = [];
  @Input() initialData: any[] = [];
  @Input() disabled: boolean = false;
  @Output() dataChange = new EventEmitter<any[]>();

  tableData: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.initializeData()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialData'] && !changes['initialData'].firstChange) {
      this.initializeData();
    }
  }

  initializeData() {
    if (this.initialData && this.initialData.length > 0) {
      this.tableData = [...this.initialData];
    } else if (this.tableData.length === 0) {
      this.addRow();
    }

    this.onDataChange()
  }

  addRow() {
    const newRow: any = {};
    this.fields.forEach(field => {
      if (field.type === 'checkbox') {
        newRow[field.key] = false;
      } else {
        newRow[field.key] = '';
      }
    });
    this.tableData.push(newRow);
    this.onDataChange();
  }

  removeRow(index: number) {
    this.tableData.splice(index, 1);
    this.onDataChange();
  }

  onDataChange() {
    this.dataChange.emit([...this.tableData]);
  }
}
