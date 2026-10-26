import { CanActivateFn, Router } from '@angular/router';
// import { KrakatoaService } from '../../services/krakatoa/krakatoa.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  // const krakatoa = inject(KrakatoaService);
  const router = inject(Router);

  // const user = krakatoa.userInformation;
  const isLoggedIn = localStorage.getItem('jwt_token');
  if (isLoggedIn) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
