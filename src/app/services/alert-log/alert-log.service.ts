import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface AlertLog {
  id: number;
  source_name: string | null;
  source_id: number | null;
  payload: any;
  matched_rules: number;
  rule_names: string | null;
  destinations_sent: any;
  status: 'success' | 'failed' | 'no_match';
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlertLogService {
  constructor(private api: BackendService) {}

  protected readonly namespace = '/alert-logs';

  getAll(
    rows: string = '10',
    page: string = '1',
  ): Observable<{ logs: AlertLog[]; total: number }> {
    return this.api.postAPI(this.namespace, { rows, page }).pipe(
      map((v) => {
        return v.data;
      }),
    );
  }

  getById(id: number): Observable<{ log: AlertLog }> {
    return this.api.getAPI(`${this.namespace}/${id}`).pipe(map((v) => v.data));
  }
}
