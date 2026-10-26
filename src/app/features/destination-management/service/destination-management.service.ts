import { Injectable } from '@angular/core';
import { BackendService } from '../../../services/backend/backend.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Destination {
  id: number;
  name: string;
  type: string;
  config?: {
    chat_id: string;
    thread_id?: string;
    bot_token?: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface CreateDestinationDTO {
  name: string;
  type: string;
  config?: {
    chat_id: string;
    thread_id?: string;
    bot_token?: string;
  };
}

export interface UpdateDestinationDTO {
  name?: string;
  type?: string;
  config?: {
    chat_id?: string;
    thread_id?: string;
    bot_token?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class DestinationManagementService {
  constructor(private api: BackendService) {}

  protected readonly namespace = '/destination-management';

  getAll(
    rows: string = '10',
    page: string = '1',
  ): Observable<{
    destinations: Destination[];
    total: number;
  }> {
    return this.api
      .postAPI(`${this.namespace}/destinations`, { rows, page })
      .pipe(map((v) => v.data));
  }

  getById(id: number): Observable<{ destination: Destination }> {
    return this.api
      .getAPI(`${this.namespace}/destinations/${id}`)
      .pipe(map((v) => v.data));
  }

  create(payload: CreateDestinationDTO): Observable<any> {
    return this.api
      .postAPI(`${this.namespace}/destinations/create`, payload)
      .pipe(map((v) => v.data));
  }

  update(id: number, payload: UpdateDestinationDTO): Observable<any> {
    return this.api
      .putAPI(`${this.namespace}/destinations/${id}`, payload)
      .pipe(map((v) => v.data));
  }

  delete(id: number): Observable<any> {
    return this.api
      .deleteAPI(`${this.namespace}/destinations/${id}`)
      .pipe(map((v) => v.data));
  }
}
