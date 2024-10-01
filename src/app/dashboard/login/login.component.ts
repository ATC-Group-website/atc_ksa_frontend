import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private adminService: AdminService,
  ) {}

  onLogin(formData: NgForm) {
    if (formData.form.invalid) {
      Object.keys(formData.form.controls).forEach((field) => {
        const control = formData.form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      this.errorMessage = null;
      this.isLoading = true;

      this.adminService.loginAdmin(formData.form.value).subscribe({
        next: (response) => {
          const token = response.token;
          this.adminService.setToken(token);
          if (
            typeof window !== 'undefined' &&
            typeof sessionStorage !== 'undefined'
          ) {
            const redirectUrl =
              sessionStorage.getItem('redirectUrl') || '/dashboard/home';
            sessionStorage.removeItem('redirectUrl');

            this.router.navigate([redirectUrl]);
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.errorMessage =
            err.error.error || 'Login failed. Please try again.';
          this.isLoading = false;
        },
      });
    }
  }
}
