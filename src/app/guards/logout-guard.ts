import { CanActivateFn } from '@angular/router';

export const logoutGuard: CanActivateFn = (route, state) => {
  return true;
};

/*
import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const logoutGuard: CanMatchFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    return true;
  }

  router.navigate(['/home']);
  return false;
};
*/