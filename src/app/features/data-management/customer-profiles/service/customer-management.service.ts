import { Injectable } from '@angular/core';
import {BackendService} from "../../../../services/backend/backend.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CustomerManagementService {
  constructor(private api: BackendService) {

  }

  protected readonly namespace = "/data-management/customer-profiles"

  getAll(payload: any) {
    return this.api.postAPI(`${this.namespace}/getAll`, payload)
      .pipe(map(v => v.data))
  }

  getById(payload: any) {
    return this.api.postAPI(`${this.namespace}/getById`, payload)
      .pipe(map(v => v.data))
  }

  create(payload: any) {
    return this.api.postAPI(`${this.namespace}/create`, payload)
      .pipe(map(v => v.data))
  }

  update(payload: any) {
    return this.api.postAPI(`${this.namespace}/update`, payload)
      .pipe(map(v => v.data))
  }

  updateStatus(payload: any) {
    payload = {...payload}
    return this.api.postAPI(`${this.namespace}/updateStatus`, payload)
      .pipe(map(v => v.data))
  }

  updateStatusAccount(payload: any) {
    payload = {...payload}
    return this.api.postAPI(`${this.namespace}/updateStatusAccount`, payload)
      .pipe(map(v => v.data))
  }

  delete(payload: any) {
    return this.api.postAPI(`${this.namespace}/delete`, payload)
      .pipe(map(v => v.data))
  }
}
