import { Injectable } from '@angular/core';
import { BackendService } from '../../../services/backend/backend.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Rule {
  name: string;
  id: number;
  source_ids: number[];
  destination_ids: number[];
  source_names?: string;
  destination_names?: string;
  filter_criteria?: any;
  message_template?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateRuleDTO {
  name: string;
  source_ids: number[];
  destination_ids: number[];
  filter_criteria?: any;
  message_template?: string;
}

export interface UpdateRuleDTO {
  name?: string;
  source_ids?: number[];
  destination_ids?: number[];
  filter_criteria?: any;
  message_template?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RuleManagementService {
  constructor(private api: BackendService) {}

  protected readonly namespace = '/rule-management';
  getAll(
    rows: string = '10',
    page: string = '1',
  ): Observable<{ rules: Rule[]; total: number }> {
    return this.api
      .postAPI(`${this.namespace}/rules`, { rows, page })
      .pipe(map((v) => v.data));
  }

  getById(id: number): Observable<{ rule: Rule }> {
    return this.api
      .getAPI(`${this.namespace}/rules/${id}`)
      .pipe(map((v) => v.data));
  }

  create(payload: CreateRuleDTO): Observable<any> {
    return this.api
      .postAPI(`${this.namespace}/rules/create`, payload)
      .pipe(map((v) => v.data));
  }

  update(id: number, payload: UpdateRuleDTO): Observable<any> {
    return this.api
      .putAPI(`${this.namespace}/rules/${id}`, payload)
      .pipe(map((v) => v.data));
  }

  delete(id: number): Observable<any> {
    return this.api
      .deleteAPI(`${this.namespace}/rules/${id}`)
      .pipe(map((v) => v.data));
  }
}
