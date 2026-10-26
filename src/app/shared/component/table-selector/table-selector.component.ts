import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MetadataService} from 'src/app/services/metadata/metadata.service';
import {Router} from '@angular/router';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Table, TableModule} from 'primeng/table';
import {SortEvent} from 'primeng/api';
import {ConfirmService} from "../../../services/confirmation.service";
import {SelectOption} from "../../../core/models/select-option";
import {AppState, pagePermissions} from "../../../core/states/app-state";
import {AlertModalService} from "../../../services/modal-service/AlertModalService";
import {Dialog} from "primeng/dialog";
import {Paginator} from "primeng/paginator";
import {SelectButton} from "primeng/selectbutton";
import {Skeleton} from "primeng/skeleton";
import {Tag} from "primeng/tag";
import {Button, ButtonDirective, ButtonLabel} from "primeng/button";
import {Checkbox} from "primeng/checkbox";
import {MultiSelect} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {Popover} from "primeng/popover";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {Select} from "primeng/select";
import {Ripple} from "primeng/ripple";
import {InputText} from "primeng/inputtext";
import {Textarea} from "primeng/textarea";

@Component({
  selector: 'app-table-selector',
  templateUrl: './table-selector.component.html',
  styleUrls: ['./table-selector.component.scss'],
  standalone: true,
  imports: [
    Dialog,
    Paginator,
    SelectButton,
    TranslatePipe,
    Skeleton,
    Tag,
    TableModule,
    ButtonDirective,
    Checkbox,
    MultiSelect,
    FormsModule,
    Button,
    Popover,
    ButtonLabel,
    IconField,
    InputIcon,
    NgIf,
    NgStyle,
    Select,
    DatePipe,
    CurrencyPipe,
    NgClass,
    NgForOf,
    Ripple,
    InputText,
    Textarea
  ]
})
export class TableSelectorComponent implements OnInit {
  @Input() objectName: any;
  @Input() data: any[] = [];
  @Input() acl: any[];
  @Input() totalRecord: number = 0;
  @Input() fields: any[] = []; // Now optional - will auto-derive if empty
  @Input() print: any;
  @Input() bankOu: any;
  @Input() loadingData: boolean = false;
  @Input() extrasButton: any[];
  @Input() extrasButton1: any[];
  @Input() extrasActionButton: any[];
  @Input() extrasActionButtonChild: any[];
  @Input() dataKeyParent: any = '';
  @Input() dataKeyChild: any = '';
  @Input() hideActionButton: boolean = false;
  @Input() expandable: boolean = false;
  @Input() selectionMode: any = 'multiple'; // 'single' or 'multiple'
  @Input() showSelectAllButton: boolean = true;
  @Input() showExportButton: boolean = true;
  @Input() showImportButton: boolean = true;
  @Input() showSelectedDataButton: boolean = true;
  @Input() canView: boolean = true;
  @Input() enableFilter: boolean = true;

  @Input() charges: any;
  @Output() refreshEvent = new EventEmitter<any>();
  @Output() statusEvent = new EventEmitter<any>();
  @Output() addEvent = new EventEmitter<any>();
  @Output() viewEvent = new EventEmitter<any>();
  @Output() updateEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();
  @Output() paggingEvent = new EventEmitter<any>();
  @Output() onLabelClickEvent = new EventEmitter<any>();
  @Output() printEvent = new EventEmitter<any>();
  @Output() retryEvent = new EventEmitter<any>();
  @Output() checkRowEvent = new EventEmitter<any>();

  // Selection events
  @Output() selectedDataEvent = new EventEmitter<any[]>();
  @Output() exportEvent = new EventEmitter<any[]>();
  @Output() importEvent = new EventEmitter<void>();
  @Output() selectionChangeEvent = new EventEmitter<any[]>();

  @ViewChild('dtTrx') dtTrx: Table;

  aclEnhanced: pagePermissions = null;
  initialData: any[] = [];
  isSorted: boolean = null;
  _selectedColumns: any[];
  globalFilter: any[] = [];
  metadata: any;
  first: number = 0;
  page: number = 1;
  rows: number = 10;
  rowtable: any[] = [
    {label: '10', value: 10},
    {label: '25', value: 25},
    {label: '50', value: 50},
    {label: '100', value: 100}
  ];
  rowsPerPage: number = 10;

  filterValue: any;
  modalVisibility = false;

  // Selection properties
  selectedItems: any[] = [];
  selectAll: boolean = false;

  investigationStatusOptions: SelectOption[] = [
    {label: 'New', value: 'NEW'},
    {label: 'Investigating', value: 'INVESTIGATING'},
    {label: 'Resolved', value: 'RESOLVED'},
    {label: 'Closed', value: 'CLOSED'}
  ];

  customerStatusOptions: SelectOption[] = [
    {label: 'Allow', value: 'ALLOW'},
    {label: 'Flagged', value: 'FLAGGED'},
    {label: 'Blocked', value: 'BLOCKED'}
  ];

  constructor(
    public router: Router,
    public appState: AppState,
    readonly alertModalService: AlertModalService,
    readonly metadataService: MetadataService,
    readonly confirmSvc: ConfirmService,
    readonly cdr: ChangeDetectorRef,
    readonly translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.metadata = this.metadataService.getMetadata();

    this.appState.currentPagePermissions$
      .subscribe(acl => {
        this.aclEnhanced = acl;
      });

    this.initializeFields();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.initialData = this.data;

      // Auto-derive fields if not provided and data is available
      if ((!this.fields || this.fields.length === 0) && this.data && this.data.length > 0) {
        this.deriveFieldsFromData();
        this.initializeFields();
      }

      // Reset selections when data changes
      this.selectedItems = [];
      this.selectAll = false;
    }

    // Handle fields changes
    if (changes['fields'] && !changes['fields'].firstChange) {
      this.initializeFields();
    }
  }

  /**
   * Derives field definitions from the data structure
   */
  private deriveFieldsFromData(): void {
    if (!this.data || this.data.length === 0) {
      return;
    }

    // Get all unique keys from the first object and potentially merge with others
    const firstItem = this.data[0];
    const keys = Object.keys(firstItem);

    this.fields = keys.map(key => {
      const value = firstItem[key];

      // Determine field type based on value
      let type = 'text';
      if (typeof value === 'number') {
        type = 'number';
      } else if (typeof value === 'boolean') {
        type = 'boolean';
      } else if (value instanceof Date || this.isDateString(value)) {
        type = 'date';
      }

      return {
        key: key,
        label: key,
        type: type,
        visible: true
      };
    });
  }

  /**
   * Checks if a string value looks like a date
   */
  private isDateString(value: any): boolean {
    if (typeof value !== 'string') return false;

    const datePattern = /^\d{4}-\d{2}-\d{2}|^\d{2}\/\d{2}\/\d{4}/;
    return datePattern.test(value) && !isNaN(Date.parse(value));
  }

  /**
   * Formats a key into a readable label (e.g., 'firstName' -> 'First Name')
   */
  private formatLabel(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
      .trim();
  }

  /**
   * Initialize fields with translations and filters
   */
  private initializeFields(): void {
    if (!this.fields || this.fields.length === 0) {
      return;
    }

    this.globalFilter = this.fields.map(data => {
      return data.key;
    });

    this.fields = this.fields.map((elData: any) => {
      return {
        ...elData,
        'field': elData.key,
        'header': this.translate.instant(elData.label || elData.key)
      }
    });

    this._selectedColumns = this.fields.filter((elData: any) =>
      elData.key != "komiUniqueID" && elData.key != "id"
    );
  }

  get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.fields.filter((col) => val.includes(col));
  }

  // Selection methods
  onSelectionChange(event: any) {
    this.selectedItems = event;
    this.updateSelectAllState();
    this.selectionChangeEvent.emit(this.selectedItems);
  }

  onSelectAllChange(event: any) {
    if (event.checked) {
      this.selectedItems = [...this.data];
      this.selectAll = true;
    } else {
      this.selectedItems = [];
      this.selectAll = false;
    }
    this.selectionChangeEvent.emit(this.selectedItems);
  }

  updateSelectAllState() {
    this.selectAll = this.data.length > 0 && this.selectedItems.length === this.data.length;
  }

  onEmitSelectedData() {
    this.selectedDataEvent.emit(this.selectedItems);
  }

  onExportData() {
    this.exportEvent.emit(this.selectedItems.length > 0 ? this.selectedItems : this.data);
  }

  onImportData() {
    this.importEvent.emit();
  }

  getSelectedCount(): number {
    return this.selectedItems.length;
  }

  customSort(event: SortEvent) {
    if (this.isSorted == null || this.isSorted === undefined) {
      this.isSorted = true;
      this.sortTableData(event);
    } else if (this.isSorted == true) {
      this.isSorted = false;
      this.sortTableData(event);
    } else if (this.isSorted == false) {
      this.isSorted = null;
      this.data = [...this.initialData];
      this.dtTrx.reset();
    }
  }

  clear(table: Table) {
    table.clear();
    this.isSorted = null;
    this.data = [...this.initialData];
    this.dtTrx.reset();
    this.filterValue = '';
    // Reset selections
    this.selectedItems = [];
    this.selectAll = false;
  }

  sortTableData(event) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;
      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }

  viewData(data: any) {
    this.viewEvent.emit(data);
  }

  editData(data: any) {
    this.updateEvent.emit(data);
  }

  onLabelClick(data: any) {
    this.updateEvent.emit(data);
  }

  getScoreGradient(score: number): string {
    if (score <= 30) {
      return '#28a745';
    } else if (score <= 70) {
      const yellowIntensity = (score - 30) / 40;
      return `linear-gradient(90deg, #28a745 ${(1 - yellowIntensity) * 100}%, #ffc107 100%)`;
    } else {
      const redIntensity = (score - 70) / 30;
      return `linear-gradient(90deg, #ffc107 ${(1 - redIntensity) * 100}%, #dc3545 100%)`;
    }
  }

  async deleteConfirm(data: any) {
    if (await this.confirmSvc.confirmDelete()) {
      this.deleteEvent.emit(data);
    }
  }

  addData() {
    this.addEvent.emit();
  }

  paggingData(data: any) {
    this.page = data.page + 1;
    data.page = this.page;
    this.rows = data.rows;
    this.first = data.first;
    this.paggingEvent.emit(data);
  }

  changeRowsPerPage(event: any) {
    let dataRow = {"page": 0, "first": 0, "rows": event.value, "pageCount": 5};
    this.paggingData(dataRow);
  }

  highlightSearch(text: string, search: string): string {
    const safeText = this.escapeHtml(String(text ?? ''));

    if (!search) return safeText;

    const pattern = new RegExp(`(${search})`, 'gi');
    return safeText.replace(pattern, `<span class="highlight">$1</span>`);
  }

  escapeHtml(text: string): string {
    return text.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  toDisplayString(value: any): string {
    return typeof value === 'object' ? JSON.stringify(value) : String(value);
  }

  negativeStatus = ['BLOCKED'];
  statusRemark: string = "";
  selectedData: any = null;
  selectedStatus: string = "";

  async onChangeStatus(event: any, selectedData: any) {
    this.statusRemark = '';
    this.selectedStatus = event || '';
    this.selectedData = selectedData || null;

    if (this.negativeStatus.includes(event)) {
      this.modalVisibility = true;
      return;
    }
    if (await this.confirmSvc.confirmCustomMessage(`Change Status to ${event} ?`)) {
      this.statusEvent.emit({data: this.selectedData, status: event});
    }
  }

  onSubmitStatus() {
    this.statusEvent.emit({data: this.selectedData, status: this.selectedStatus, remark: this.statusRemark});
    this.modalVisibility = false;
  }
}
