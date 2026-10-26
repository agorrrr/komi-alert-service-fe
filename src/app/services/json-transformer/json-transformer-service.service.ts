import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JsonTransformerServiceService {
  constructor() {}
  transformJson(jsonData: any): { key: string; value: any; realKey: any }[] {
    return Object.entries(jsonData).map(([realKey, value]) => ({
      key: realKey,
      value,
      realKey,
    }));
  }

  transformJsonArray(jsonArray: any[]): { key: string; value: any }[] {
    const transformedData: { key: string; value: any }[] = [];

    for (const jsonObj of jsonArray) {
      for (const key in jsonObj) {
        transformedData.push({
          key: this.transformKey(key).toLowerCase(),
          value: jsonObj[key],
        });
      }
    }

    return transformedData;
  }

  transformJsonArrayOri(jsonArray: any[]): { key: string; value: any }[] {
    const transformedData: { key: string; value: any }[] = [];

    for (const jsonObj of jsonArray) {
      for (const key in jsonObj) {
        transformedData.push({
          key: key,
          value: jsonObj[key],
        });
      }
    }

    return transformedData;
  }

  private transformKey(key: string): string {

    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }

  private transformKeyOri(key: string): string {

    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str);
  }


  transformJsonRealkey(jsonData: any): { key: string; value: any; realKey: any }[] {
    return Object.entries(jsonData).map(([realKey, value]) => ({
      key: realKey,
      value,
      realKey,
    }));
  }
}
