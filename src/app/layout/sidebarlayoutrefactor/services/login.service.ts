import { Injectable } from '@angular/core';
// import { KrakatoaService } from 'src/app/services/krakatoa/krakatoa.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // constructor(private krakatoa: KrakatoaService) { }

isLoggedIn(): boolean {
  const token = localStorage.getItem('jwt_token');
  return !!token;  // Or decode and check expiry
}

}
