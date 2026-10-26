import { Component, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DatePipe, DecimalPipe } from '@angular/common';
import { JsonTransformerServiceService } from '../../../../services/json-transformer/json-transformer-service.service';
import {
  companyCreateJson,
  createIncidental,
  matrixNotification,
  ouJson,
  thirdParty,
  updateCancelIncidental,
  updateIncidental,
  updateMatrixTransaction,
  updateRenewal,
  users,
  vaCreateJson,
  valinkDebit,
  vaRevenuePoolJson,
  vaUpdate,
  vaUpdateBalanceDebit,
  vaUpdateDebitLimit,
  vaUpdateStatus,
  virtualNUmbering,
} from '../../../../core/base/constants';
import { dynamicFraud } from './view-format';

@Component({
  selector: 'app-approval-confirmation',
  templateUrl: './approval-confirmation.component.html',
  styleUrls: ['./approval-confirmation.component.scss'],
  standalone: false,
})
export class ApprovalConfirmationComponent implements OnInit {
  @Input() dataApprove: any;
  @Input() id_approval: any;

  itemsTab: MenuItem[] | undefined;
  page_name: any;
  id_approv: any;
  dataApproveTemp: any;

  dataPriviewBulk: any[] = [];

  outputOldJson: any;
  outputNewJson: any;

  constructor(
    readonly jsonTransformerService: JsonTransformerServiceService,
    readonly datePipe: DatePipe,
    readonly cdr: ChangeDetectorRef,
    readonly decimalPipe: DecimalPipe,
  ) {}

  async ngOnInit(): Promise<void> {
    this.id_approv = this.dataApprove.id_approval;
    this.dataApproveTemp = this.dataApprove;

    this.setupDataJson();

    if (this.dataApprove.data_of_name.includes('Bulk')) {
      await this.previewBulk(JSON.parse(this.dataApprove.new_dataJson));
    }
  }

  setupDataJson() {
    this.page_name = this.dataApproveTemp.page_name;
    this.outputNewJson = this.mapingDataJson(
      this.dataApproveTemp.page_name,
      this.dataApproveTemp.data_action,
      typeof this.dataApproveTemp.new_dataJson === 'string'
        ? JSON.parse(this.dataApproveTemp.new_dataJson)
        : this.dataApproveTemp.new_dataJson,
    );

    if (this.dataApproveTemp.old_dataJson != null) {
      this.outputOldJson = this.mapingDataJson(
        this.dataApproveTemp.page_name,
        this.dataApproveTemp.data_action,
        typeof this.dataApproveTemp.old_dataJson === 'string'
          ? JSON.parse(this.dataApproveTemp.old_dataJson)
          : this.dataApproveTemp.old_dataJson,
      );

      let compreJson = this.compareJSON(this.outputOldJson, this.outputNewJson);
      // this.outputOldJson = this.convertObject({data: this.outputOldJson});
      // this.outputNewJson = this.convertObject({data: compreJson});
      // this.outputOldJson = this.outputOldJson
      this.outputNewJson = compreJson;
    } else {
      //   this.outputNewJson = this.convertObject({data: this.outputNewJson});
    }
  }

  formatCurrency(value, currency) {
    if (value) {
      return currency + ' ' + this.decimalPipe.transform(value, '1.2-2');
    } else {
      return null;
    }
  }

  mapingDataJson(pageName: string, dataAction: string, json: any) {
    const formatJsonCurrency = (jsonData: any) => {
      const currencyCode =
        jsonData?.currency?.currencyCode || jsonData?.currency || 'IDR';
      if (jsonData && typeof jsonData === 'object') {
        for (const key in jsonData) {
          if (jsonData.hasOwnProperty(key)) {
            this.formatCurrencyIfNeeded(jsonData, key, currencyCode);
          }
        }
      }
    };

    const dataActionMappings = {
      'Dynamic Fraud Rule': {
        C: dynamicFraud,
        default: dynamicFraud,
      },
    };

    const staticMappings = {
      'Bank Revenue Pool': vaRevenuePoolJson,
      'Company Users': users,
      Company: companyCreateJson,
      'Organizational Unit': ouJson,
      'Virtual Numbering': virtualNUmbering,
      'Matrix Notification': matrixNotification,
      '3rd Party': thirdParty,
    };

    const getFormatJson = (pageName: string, dataAction: string): any => {
      if (pageName === 'VA') {
        return this.getVaFormatJson(dataAction);
      }

      if (staticMappings[pageName]) {
        return staticMappings[pageName];
      }

      if (dataActionMappings[pageName]) {
        const actionMap = dataActionMappings[pageName];
        return actionMap[dataAction] || actionMap.default;
      }

      return null;
    };

    const formatJson = getFormatJson(pageName, dataAction);
    if (!formatJson) return json;

    let jsonMapping = this.mapingProcess(formatJson, json);
    formatJsonCurrency(jsonMapping);
    return jsonMapping;
  }

  private formatJsonCurrency(jsonData: any): void {
    const currencyCode = this.getCurrencyCode(jsonData);
    this.processJsonData(jsonData, currencyCode);
  }

  private getCurrencyCode(jsonData: any): string {
    return jsonData?.currency?.currencyCode || jsonData?.currency || 'IDR';
  }

  private processJsonData(jsonData: any, currencyCode: string): void {
    if (jsonData && typeof jsonData === 'object') {
      for (const key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
          this.formatCurrencyIfNeeded(jsonData, key, currencyCode);
        }
      }
    }
  }

  private formatCurrencyIfNeeded(
    jsonData: any,
    key: string,
    currencyCode: string,
  ): void {
    const keysToFormat = [
      'maximum',
      'minimum',
      'creationValue',
      'usageValue',
      'adminValue',
      'transactionValueBank',
      'transactionValueCompany',
      'transactionValueThirdParty',
      'total',
      'transactionLimitAmount',
      'transactionLimitAmountPerDay',
      'amountLimitForVaCreation',
    ];

    if (keysToFormat.includes(key)) {
      jsonData[key] = this.formatCurrency(jsonData[key], currencyCode);
    } else if (this.isObject(jsonData[key])) {
      this.formatJsonCurrency(jsonData[key]);
    }
  }

  private getVaFormatJson(dataAction: string) {
    if (dataAction === 'C') return vaCreateJson;
    if (dataAction === 'U') return vaUpdate;
    if (dataAction === 'UBALANCE') return vaUpdateBalanceDebit;
    if (dataAction === 'ULIMIT') return vaUpdateDebitLimit;
    if (dataAction === 'URENEWAL') return updateRenewal;
    if (dataAction === 'UMATRIX') return updateMatrixTransaction;
    if (dataAction === 'CINC') return createIncidental;
    if (dataAction === 'UINC') return updateIncidental;
    if (dataAction === 'UCANCL') return updateCancelIncidental;
    if (dataAction === 'CLINK' || dataAction === 'DLINK') return valinkDebit;
    return vaUpdateStatus;
  }

  compareJSON(json1: any, json2: any): any {
    // Handle array comparison at the root level
    if (Array.isArray(json1) && Array.isArray(json2)) {
      return this.compareArrays(json1, json2);
    }

    // Handle case where one is array and other is not
    if (Array.isArray(json1) || Array.isArray(json2)) {
      if (Array.isArray(json2)) {
        return this.processNewValue(json2);
      }
      return json2;
    }

    const diff = {};

    if (!json1 || !json2) return json2 || json1 || {};

    // Get all unique keys from both objects
    const allKeys = new Set([...Object.keys(json1), ...Object.keys(json2)]);

    for (const key of allKeys) {
      const oldValue = json1[key];
      const newValue = json2[key];
      const oldExists = json1.hasOwnProperty(key);
      const newExists = json2.hasOwnProperty(key);

      // Handle different scenarios
      if (!oldExists && newExists) {
        // Key only exists in new data
        diff[key] = this.processNewValue(newValue);
      } else if (oldExists && !newExists) {
        // Key only exists in old data - skip completely (no DELETED terms)
        continue;
      } else if (oldExists && newExists) {
        // Key exists in both - process based on value types
        diff[key] = this.processExistingValue(oldValue, newValue);
      }
    }

    return diff;
  }

  private processNewValue(value: any): any {
    if (value === null || value === undefined) {
      return '-';
    } else if (Array.isArray(value)) {
      return this.compareArrays([], value);
    } else if (this.isObject(value)) {
      return this.markObjectAsUpdatedRecursive(value);
    } else {
      return value + ' (UPDATED)';
    }
  }

  private processExistingValue(oldValue: any, newValue: any): any {
    // Both values are null
    if (oldValue === null && newValue === null) {
      return '-';
    }

    // Old is null, new has value
    if (oldValue === null && newValue !== null) {
      return this.processNewValue(newValue);
    }

    // Old has value, new is null
    if (oldValue !== null && newValue === null) {
      return '-';
    }

    // Both are arrays - FIXED: Ensure consistent array handling
    if (Array.isArray(newValue) && Array.isArray(oldValue)) {
      return this.compareArrays(oldValue, newValue);
    }

    // Both are objects - RECURSIVE COMPARISON with proper array handling
    if (this.isObject(newValue) && this.isObject(oldValue)) {
      const nestedDiff = this.compareJSON(oldValue, newValue); // RECURSIVE CALL

      // Check if there are any changes in the nested object
      const hasChanges = this.hasNestedChanges(nestedDiff);

      if (hasChanges) {
        return nestedDiff; // Return the nested diff with changes
      } else {
        return newValue; // No changes, return the new value as-is
      }
    }

    // One is array, other is object - treat as different
    if (
      (Array.isArray(newValue) && this.isObject(oldValue)) ||
      (this.isObject(newValue) && Array.isArray(oldValue))
    ) {
      return this.processNewValue(newValue);
    }

    // Compare primitive values
    if (oldValue?.toString() !== newValue?.toString()) {
      if (this.isObject(newValue)) {
        return JSON.stringify(newValue) + ' (UPDATED)';
      } else {
        return newValue + ' (UPDATED)';
      }
    }

    // Values are the same
    return newValue;
  }

  private compareArrays(oldArray: any[], newArray: any[]): any[] {
    const result = [];

    // Handle arrays of objects
    if (
      oldArray.length > 0 &&
      newArray.length > 0 &&
      this.isObject(oldArray[0]) &&
      this.isObject(newArray[0])
    ) {
      const getObjectSignature = (obj: any): string => {
        if (obj.date) return obj.date;
        if (obj.id) return obj.id;
        if (obj.code) return obj.code;

        const identifiers = [
          'channelName',
          'channelId',
          'transactionId',
          'name',
        ];
        for (const key of identifiers) {
          if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
            return `${key}:${obj[key]}`;
          }
        }

        return JSON.stringify(obj);
      };

      const oldMap = new Map();
      const newMap = new Map();
      const processedNewItems = new Set();

      // Build maps
      oldArray.forEach((item, index) => {
        const signature = getObjectSignature(item);
        oldMap.set(signature, { item, index });
      });

      newArray.forEach((item, index) => {
        const signature = getObjectSignature(item);
        newMap.set(signature, { item, index });
      });

      // Process items that exist in both arrays (potentially modified)
      newArray.forEach((newItem, newIndex) => {
        const signature = getObjectSignature(newItem);
        const oldEntry = oldMap.get(signature);

        if (oldEntry) {
          // Item exists in both arrays - RECURSIVE COMPARISON
          const oldItem = oldEntry.item;
          processedNewItems.add(newIndex);

          if (JSON.stringify(oldItem) === JSON.stringify(newItem)) {
            result.push(newItem);
          } else {
            // FIXED: Use compareJSON for consistent recursive behavior
            const comparison = this.compareJSON(oldItem, newItem);
            const hasChanges = this.hasNestedChanges(comparison);

            if (hasChanges) {
              result.push(comparison);
            } else {
              result.push(newItem);
            }
          }
        }
      });

      // Process new items
      newArray.forEach((newItem, newIndex) => {
        if (!processedNewItems.has(newIndex)) {
          const signature = getObjectSignature(newItem);
          if (!oldMap.has(signature)) {
            result.push(
              this.markObjectAsUpdatedRecursive(
                JSON.parse(JSON.stringify(newItem)),
              ),
            );
          }
        }
      });
    } else {
      // Handle simple arrays or mixed arrays
      const oldSet = new Set(oldArray.map((item) => JSON.stringify(item)));

      newArray.forEach((newItem) => {
        const itemStr = JSON.stringify(newItem);
        if (oldSet.has(itemStr)) {
          result.push(newItem);
        } else {
          if (this.isObject(newItem)) {
            result.push(this.markObjectAsUpdatedRecursive(newItem));
          } else if (Array.isArray(newItem)) {
            result.push(this.compareArrays([], newItem));
          } else {
            result.push(newItem + ' (UPDATED)');
          }
        }
      });
    }

    return result;
  }

  private hasNestedChanges(obj: any): boolean {
    if (!this.isObject(obj)) {
      return typeof obj === 'string' && obj.includes('(UPDATED)');
    }

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        if (typeof value === 'string' && value.includes('(UPDATED)')) {
          return true;
        }

        if (Array.isArray(value)) {
          const hasArrayChanges = value.some((item) => {
            if (typeof item === 'string' && item.includes('(UPDATED)')) {
              return true;
            }
            if (this.isObject(item) && this.hasNestedChanges(item)) {
              return true;
            }
            return false;
          });
          if (hasArrayChanges) return true;
        }

        if (this.isObject(value) && this.hasNestedChanges(value)) {
          return true;
        }
      }
    }

    return false;
  }

  private markObjectAsUpdatedRecursive(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj + ' (UPDATED)';
    }

    if (!this.isObject(obj) && !Array.isArray(obj)) {
      return obj + ' (UPDATED)';
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => {
        if (this.isObject(item)) {
          return this.markObjectAsUpdatedRecursive(item);
        } else if (Array.isArray(item)) {
          return this.markObjectAsUpdatedRecursive(item);
        } else {
          return item + ' (UPDATED)';
        }
      });
    }

    const result = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (this.isObject(obj[key])) {
          // RECURSIVE CALL for nested objects
          result[key] = this.markObjectAsUpdatedRecursive(obj[key]);
        } else if (Array.isArray(obj[key])) {
          // RECURSIVE CALL for arrays
          result[key] = this.markObjectAsUpdatedRecursive(obj[key]);
        } else {
          result[key] = obj[key] + ' (UPDATED)';
        }
      }
    }
    return result;
  }

  convertObject(obj) {
    if (obj) {
      return Object.entries(obj).map(([key, value]) => {
        value = value == '' ? null : value;

        if (typeof value === 'object' && !Array.isArray(value)) {
          return {
            key,
            value: this.convertObject(value),
          };
        } else {
          return {
            key,
            value,
          };
        }
      });
    } else {
      return null;
    }
  }

  mapingProcess(json1: any, json2: any): any {
    const diff = {};

    if (!json1 || !json2) {
      return diff;
    }

    for (const key in json1) {
      if (!json1.hasOwnProperty(key)) continue;

      if (this.isObject(json1[key])) {
        this.processNestedObject(json1, json2, key, diff);
      } else if (json1[key] !== json2[key]) {
        diff[key] = json2[key];
      }
    }

    return diff;
  }

  private isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }

  private processNestedObject(
    json1: any,
    json2: any,
    key: string,
    diff: any,
  ): void {
    if (!json2.hasOwnProperty(key)) {
      diff[key] = json1[key];
    } else {
      const nestedDiff = this.mapingProcess(json1[key], json2[key]);
      if (Object.keys(nestedDiff).length > 0) {
        diff[key] = nestedDiff;
      }
    }
  }

  async previewBulk(item: any) {
    const payload = {
      bulkProcessId: item.bulkProcessId,
      action: item.action,
    };
  }
}
