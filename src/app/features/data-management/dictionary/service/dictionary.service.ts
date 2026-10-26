import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {BackendService} from "../../../../services/backend/backend.service";

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  constructor(private api: BackendService) {

  }

  protected readonly namespace = "/data-management/dictionary"

  getAll(payload: any) {
    return this.api.postAPI(`${this.namespace}/getAll`, payload)
      .pipe(map(v => v.data))
  }

  getDetail(payload: any) {
    return this.api.postAPI(`${this.namespace}/detail`, payload)
      .pipe(map(v => v.data))
  }

  getPreviewQuery(payload: any) {
    return this.api.postAPI(`${this.namespace}/preview`, payload)
      .pipe(map(v => v.data))
  }

  countIgniteData(payload: any) {
    return this.api.postAPI(`${this.namespace}/count`, payload)
      .pipe(map(v => v.data))
  }

  getColumns(payload: any) {
    return this.api.postAPI(`${this.namespace}/columns`, payload)
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

  delete(payload: any) {
    return this.api.postAPI(`${this.namespace}/delete`, payload)
      .pipe(map(v => v.data))
  }
}
