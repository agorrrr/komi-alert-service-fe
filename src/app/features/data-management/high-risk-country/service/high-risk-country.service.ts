import { Injectable } from '@angular/core';
import {BackendService} from "../../../../services/backend/backend.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HighRiskCountryService {
  constructor(private api: BackendService) {

  }

  protected readonly namespace = "/data-management/high-risk-country"

  getAll(payload: any) {
    return this.api.postAPI(`${this.namespace}/getAll`, payload)
      .pipe(map(v => v.data))
  }
}
