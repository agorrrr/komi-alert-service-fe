import { Injectable } from '@angular/core';
import { BackendService } from '../../../services/backend/backend.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Source {
  id: number;
  name: string;
  type: string;
  secret_key?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateSourceDTO {
  name: string;
  type: string;
  secret_key?: string;
}

export interface UpdateSourceDTO {
  name?: string;
  type?: string;
  secret_key?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SourceManagementService {
  constructor(private api: BackendService) {}

  protected readonly namespace = '/source-management';

  getAll(
    rows: string = '10',
    page: string = '1',
  ): Observable<{ sources: Source[]; total: number }> {
    return this.api
      .postAPI(`${this.namespace}/sources`, { rows, page })
      .pipe(map((v) => v.data));
  }

  getById(id: number): Observable<{ source: Source }> {
    return this.api
      .getAPI(`${this.namespace}/sources/${id}`)
      .pipe(map((v) => v.data));
  }

  create(payload: CreateSourceDTO): Observable<any> {
    return this.api
      .postAPI(`${this.namespace}/sources/create`, payload)
      .pipe(map((v) => v.data));
  }

  update(id: number, payload: UpdateSourceDTO): Observable<any> {
    return this.api
      .putAPI(`${this.namespace}/sources/${id}`, payload)
      .pipe(map((v) => v.data));
  }

  delete(id: number): Observable<any> {
    return this.api
      .deleteAPI(`${this.namespace}/sources/${id}`)
      .pipe(map((v) => v.data));
  }
}
