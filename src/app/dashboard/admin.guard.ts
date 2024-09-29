import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AdminService } from './admin.service';

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const adminService = inject(AdminService);

  const token = sessionStorage.getItem('adminToken');
  // Check for any dashboard-related routes
  if (token) {
    adminService.adminToken.next(token); // Set the token in the admin service
    return true;
  } else {
    // Store the original URL for redirecting after login
    sessionStorage.setItem('redirectUrl', state.url);
    router.navigate(['/dashboard/login']); // Redirect to login
    return false;
  }
};

// Guard to prevent accessing the login page if already logged in
export const loginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('adminToken');

  if (token) {
    // User is already logged in, block access to the login page and redirect
    const redirectUrl =
      sessionStorage.getItem('redirectUrl') || '/dashboard/home';
    router.navigate([redirectUrl]);
    return false; // Block access to login
  } else {
    // If not logged in, allow access to the login page
    return true;
  }
};
