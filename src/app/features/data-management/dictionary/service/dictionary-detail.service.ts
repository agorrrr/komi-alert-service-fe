import {Injectable} from '@angular/core';
import {map} from "rxjs/operators";
import {BackendService} from "../../../../services/backend/backend.service";

@Injectable({
  providedIn: 'root'
})
export class DictionaryDetailService {
  constructor(private api: BackendService) {

  }

  protected readonly namespace = "/data-management/dictionary/detail"

  getAll(payload: any) {
    return this.api.postAPI(`${this.namespace}/getAll`, payload)
      .pipe(map(v => v.data))
  }

  downloadExample(payload: any) {
    return this.api.postAPIDownload(`${this.namespace}/downloadExample`, payload)
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

  import(payload: any) {
    return this.api.postAPI(`${this.namespace}/import`, payload)
  }

  export(payload: any) {
    return this.api.postAPI(`${this.namespace}/export`, payload)
  }
}
