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
      const Data = formData.form.value;
      this.adminService.loginAdmin(Data).subscribe({
        next: (response) => {
          const token = response.token;
          this.adminService.setToken(token);
          this.router.navigate(['dashboard/home']);
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err.error.error;
          this.isLoading = false;
        },
      });
    }
  }
}
