import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from './admin.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const adminService = inject(AdminService);

  const token = sessionStorage.getItem('adminToken');
  if (token != null) {
    adminService.adminToken.next(token);
    return true;
  } else {
    router.navigate(['/dashboard/login']);
    return false;
  }
};
