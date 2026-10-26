import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {BackendService} from "../../../../services/backend/backend.service";

@Injectable({
  providedIn: 'root'
})
export class WhitelistAccService {
  constructor(private api: BackendService) {

  }

  protected readonly namespace = "/data-management/whitelist-account"

  getAll(payload: any) {
    return this.api.postAPI(`${this.namespace}/getAll`, payload)
      .pipe(map(v => v.data))
  }


  create(payload: any) {
    return this.api.postAPI(`${this.namespace}/create`, payload)
      .pipe(map(v => v.data))
  }

  createBulk(payload: any) {
    return this.api.postAPI(`${this.namespace}/createBulk`, payload)
      .pipe(map(v => v.data))
  }

  update(payload: any) {
    return this.api.postAPI(`${this.namespace}/update`, payload)
      .pipe(map(v => v.data))
  }

  delete(payload: any) {
    return this.api.postAPI(`${this.namespace}/delete`, payload)
      .pipe(map(v => v.data))
  }

  export(payload: any) {
    return this.api.postAPIDownload(`${this.namespace}/export`, payload)
  }
}
