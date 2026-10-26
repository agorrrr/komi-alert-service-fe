import {Component, Input, OnInit} from '@angular/core';
import {JsonTransformerServiceService} from "../../../services/json-transformer/json-transformer-service.service";

interface TransformedDataItem {
  key: string;
  value: any;
}

interface WhoWhenDisplay {
  key: string;
  label: string;
  value: any;
  icon: string;
}

interface NestedObjectItem {
  key: string;
  value: any;
  level: number;
  path: string[];
  isContainer: boolean;
}

@Component({
  selector: 'app-view-data-formatted',
  templateUrl: './view-data-formatted.component.html',
  styleUrls: ['./view-data-formatted.component.scss'],
  standalone: false
})
export class ViewDataFormattedComponent implements OnInit {
  @Input() data: any;
  @Input() excludedKeys: string[] = [];
  @Input() widthLabel: string = 'w-20';
  @Input() widthValue: string = 'flex-1';
  @Input() showPermissions: boolean = true;
  @Input() showMetadata: boolean = true;
  @Input() maxNestingLevel: number = 20;
  @Input() indentSize: number = 5;

  // Main data arrays
  transformedData: TransformedDataItem[] = [];
  whoWhenData: WhoWhenDisplay[] = [];
  arrayData: TransformedDataItem[] = [];
  nestedObjectData: NestedObjectItem[] = [];

  // State flags
  hasMetadata: boolean = false;

  private readonly whoWhenKeys: string[] = ['created_at', 'created_by', 'updated_at', 'updated_by', 'created_date', 'updated_date'];
  private readonly whoWhenLabels: { [key: string]: string } = {
    created_at: 'Created Date',
    created_date: 'Created Date',
    updated_at: 'Updated Date',
    updated_date: 'Updated Date',
    created_by: 'Created By',
    updated_by: 'Updated By'
  };

  private readonly permissionKeys: string[] = ['c_create', 'c_read', 'c_update', 'c_delete', 'c_view', 'c_approve'];

  constructor(
    private jsonSvc: JsonTransformerServiceService) {
  }

  ngOnInit(): void {
    this.initializeData();
  }

  private initializeData(): void {
    if (!this.data) return;

    // Transform the data
    const transformedData = this.jsonSvc.transformJson(this.data);

    // Separate data into categories
    this.separateDataCategories(transformedData);
  }

  // Helper method to check if a key should be excluded
  private isKeyExcluded(key: string): boolean {
    if (!this.excludedKeys || this.excludedKeys.length === 0) {
      return false;
    }
    return this.excludedKeys.includes(key);
  }

  // Helper method to check if a path should be excluded (for nested objects)
  private isPathExcluded(path: string[]): boolean {
    if (!this.excludedKeys || this.excludedKeys.length === 0) {
      return false;
    }

    // Check if any key in the path matches an excluded key
    return path.some(key => this.excludedKeys.includes(key));
  }

  private separateDataCategories(data: TransformedDataItem[]): void {
    // Filter out excluded keys from all categories
    const filteredData = data.filter(item => !this.isKeyExcluded(item.key));

    // Flat/primitive data (strings, numbers, booleans, null)
    this.transformedData = filteredData.filter(item =>
      !this.permissionKeys.includes(item.key) &&
      !this.whoWhenKeys.includes(item.key) &&
      !Array.isArray(item.value) &&
      !this.isNestedObject(item.value)
    );

    // Array data
    this.arrayData = filteredData.filter(item =>
      Array.isArray(item.value) &&
      !this.permissionKeys.includes(item.key) &&
      !this.whoWhenKeys.includes(item.key)
    );

    // Process nested objects with unlimited depth
    this.processNestedObjects(filteredData);

    if (this.showMetadata) {
      this.processMetadata(filteredData);
    }
  }

  private processNestedObjects(data: TransformedDataItem[]): void {
    this.nestedObjectData = [];

    const nestedItems = data.filter(item =>
      this.isNestedObject(item.value) &&
      !this.permissionKeys.includes(item.key) &&
      !this.whoWhenKeys.includes(item.key) &&
      !this.isKeyExcluded(item.key)
    );

    for (const item of nestedItems) {
      this.flattenNestedObject(item.key, item.value, 0, [item.key]);
    }
  }

  private flattenNestedObject(key: string, obj: any, level: number, path: string[]): void {
    // Check if current path should be excluded
    if (this.isPathExcluded(path)) {
      return;
    }

    // Safety check to prevent infinite loops
    if (level >= this.maxNestingLevel) {
      this.nestedObjectData.push({
        key: key,
        value: 'Max nesting level reached',
        level: level,
        path: [...path],
        isContainer: false
      });
      return;
    }

    if (!this.isNestedObject(obj)) {
      // If it's not a nested object, add it as a leaf item
      this.nestedObjectData.push({
        key: key,
        value: obj,
        level: level,
        path: [...path],
        isContainer: false
      });
      return;
    }

    // Add the parent object as a container
    this.nestedObjectData.push({
      key: key,
      value: null,
      level: level,
      path: [...path],
      isContainer: true
    });

    // Process children
    const keys = Object.keys(obj);
    for (const childKey of keys) {
      // Skip excluded child keys
      if (this.isKeyExcluded(childKey)) {
        continue;
      }

      const childValue = obj[childKey];
      const childPath = [...path, childKey];

      if (this.isNestedObject(childValue)) {
        // Recursively process nested objects
        this.flattenNestedObject(childKey, childValue, level + 1, childPath);
      } else {
        // Add leaf values
        this.nestedObjectData.push({
          key: childKey,
          value: childValue,
          level: level + 1,
          path: childPath,
          isContainer: false
        });
      }
    }
  }

  private processMetadata(data: TransformedDataItem[]): void {
    const metadataItems = data.filter(item =>
      this.whoWhenKeys.includes(item.key) &&
      !this.isKeyExcluded(item.key)
    );
    this.hasMetadata = metadataItems.length > 0;

    if (this.hasMetadata) {
      this.whoWhenData = this.whoWhenKeys
        .filter(key => !this.isKeyExcluded(key))
        .map(key => {
          const item = metadataItems.find(m => m.key === key);
          return item ? {
            key,
            label: this.whoWhenLabels[key],
            value: item.value,
            icon: this.getWhoWhenIcon(key)
          } : null;
        })
        .filter(item => item !== null) as WhoWhenDisplay[];
    }
  }

  // Helper method to check if value is a nested object
  private isNestedObject(value: any): boolean {
    return value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      !(value instanceof Date) &&
      Object.keys(value).length > 0;
  }

  // Method to format nested object values
  formatNestedValue(item: NestedObjectItem): string {
    if (item.value === null || item.value === undefined) return '-';

    if (this.isDateField(item.key)) {
      return item.value;
    }

    if (typeof item.value === 'boolean') {
      return item.value ? 'true' : 'false';
    }

    if (typeof item.value === 'number') {
      return item.value.toString();
    }

    if (typeof item.value === 'object' && !Array.isArray(item.value)) {
      try {
        return JSON.stringify(item.value, null, 2);
      } catch (e) {
        return '[Complex Object]';
      }
    }

    return item.value.toString();
  }

  // Get indentation style based on nesting level
  getIndentationStyle(level: number): { [key: string]: string } {
    const indentAmount = Math.max(0, level) * this.indentSize;
    return {
      'margin-left': `${indentAmount}px`,
      'position': 'relative'
    };
  }

  // Alternative method using CSS classes
  getIndentationClass(level: number): string {
    const paddingMap: { [key: number]: string } = {
      0: '',
      1: 'ml-5',
      2: 'ml-10',
      3: 'ml-16',
      4: 'ml-20',
      5: 'ml-24',
      6: 'ml-28',
      7: 'ml-32',
      8: 'ml-36',
      9: 'ml-40',
      10: 'ml-44'
    };

    return paddingMap[level] || 'ml-48';
  }

  // Check if item is a parent container
  isParentContainer(item: NestedObjectItem): boolean {
    return item.isContainer;
  }

  // Get the full path as a readable string
  getFullPath(item: NestedObjectItem): string {
    return item.path.join(' > ');
  }

  // Get depth indicator for visual feedback
  getDepthIndicator(level: number): string {
    return '│ '.repeat(level);
  }

  private getWhoWhenIcon(key: string): string {
    switch (key) {
      case 'created_at':
      case 'updated_at':
        return 'pi-clock';
      case 'created_by':
        return 'pi-user-plus';
      case 'updated_by':
        return 'pi-user-edit';
      default:
        return 'pi-user';
    }
  }

  // Utility methods
  isDateField(key: string): boolean {
    return key.includes('_at') || key.includes('date');
  }

  formatValue(item: TransformedDataItem): string {
    if (item.value === null || item.value === undefined) return '-';

    if (this.isArray(item.value)) {
      return `[${item.value.length} items]`;
    }

    if (this.isDateField(item.key)) {
      return item.value;
    }

    if (typeof item.value === 'boolean') {
      return item.value ? 'true' : 'false';
    }

    if (item.key === 'filterPortal')
      return item.value == 1 ? 'Yes' : 'No';

    if (item.key === 'required')
      return item.value == 1 ? 'Yes' : 'No';

    return item.value.toString();
  }

  canShowMetadata(): boolean {
    return this.showMetadata && this.hasMetadata;
  }

  getGridCols(): string {
    return this.hasArrayData() ? 'grid-cols-2' : 'grid-cols-1';
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  hasNestedObjects(): boolean {
    return this.nestedObjectData.length > 0;
  }

  hasArrayData(): boolean {
    return this.arrayData.length > 0;
  }

  hasRegularData(): boolean {
    return this.transformedData.length > 0;
  }

  getSeverityStatus(input: any): any {
    if (input == 0)
      return "danger"
    if (input === 'Draft')
      return "secondary"
    return "success"
  }

  getValueStatus(input: any): any {
    if (input == 0)
      return "Inactive"
    if (input == 1)
      return "Active"
    if (input === "Active")
      return "Active"
    if (input === "Inactive")
      return "Inactive"
    return input
  }
}
