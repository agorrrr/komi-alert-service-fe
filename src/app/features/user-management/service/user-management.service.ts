import { Injectable } from '@angular/core';
import { BackendService } from '../../../services/backend/backend.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  username: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateUserDTO {
  username: string;
  password: string;
  email?: string;
}

export interface UpdateUserDTO {
  username?: string;
  password?: string;
  email?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  constructor(private api: BackendService) {}

  protected readonly namespace = '/user-management';

  getAll(
    rows: string = '10',
    page: string = '1',
  ): Observable<{ users: User[]; total: number }> {
    return this.api
      .postAPI(`${this.namespace}/users`, { rows, page })
      .pipe(map((v) => v.data));
  }

  getById(id: number): Observable<{ user: User }> {
    return this.api
      .getAPI(`${this.namespace}/users/${id}`)
      .pipe(map((v) => v.data));
  }

  create(payload: CreateUserDTO): Observable<any> {
    return this.api.postAPI(`/auth/register`, payload).pipe(map((v) => v.data));
  }

  update(id: number, payload: UpdateUserDTO): Observable<any> {
    return this.api
      .putAPI(`${this.namespace}/users/${id}`, payload)
      .pipe(map((v) => v.data));
  }

  delete(id: number): Observable<any> {
    return this.api
      .deleteAPI(`${this.namespace}/users/${id}`)
      .pipe(map((v) => v.data));
  }
}
