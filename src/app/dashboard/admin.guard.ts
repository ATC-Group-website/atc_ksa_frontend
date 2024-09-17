import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const localAdminData = sessionStorage.getItem('adminToken');
  if (localAdminData != null) {
    return true;
  } else {
    router.navigate(['/admin']);
    return false;
  }
};
