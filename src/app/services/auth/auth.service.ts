import { EventEmitter, Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _loggedInfo = new BehaviorSubject<any>({ status: 0, data: {} });
  _loggedInfo$ = this._loggedInfo.asObservable();
  $isLoggedInfo = new EventEmitter();
  $isLogofInfo = new EventEmitter();
  userInformation: any = {};

  constructor(readonly backend: BackendService) {
    // Load user info from localStorage on init
    const storedUser = localStorage.getItem('user_info');
    if (storedUser) {
      this.userInformation = JSON.parse(storedUser);
      this.$isLoggedInfo.emit(this.userInformation);
      this._loggedInfo.next(this.userInformation);
    }
  }

  emitLayout(payload: any) {
    this.userInformation = payload;
    this.$isLoggedInfo.emit(this.userInformation);
    this._loggedInfo.next(this.userInformation);
  }

  emitLogoff() {
    this.userInformation = {};
    this.$isLoggedInfo.emit(this.userInformation);
    this._loggedInfo.next(this.userInformation);
    this.$isLogofInfo.emit(true);

    // Clear localStorage
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_info');
  }

  // Login using local backend
  loginLocal(payload: { credential: string; secret: string }) {
    const url = '/auth/signvia';
    return this.backend.post(url, payload);
  }

  // Logout
  logout() {
    this.emitLogoff();
  }

  // Check if logged in
  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt_token');
    return !!token;
  }

  // Get current token
  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  // Get current user
  getCurrentUser(): any {
    const user = localStorage.getItem('user_info');
    return user ? JSON.parse(user) : null;
  }
}
