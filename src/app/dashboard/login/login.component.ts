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
  constructor(
    private adminService: AdminService,
    private router: Router,
  ) {}

  onLogin(formData: NgForm) {
    if (formData.form.invalid) {
      Object.keys(formData.form.controls).forEach((field) => {
        const control = formData.form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      // Handle valid form submission and send it to the back end
      const Data = formData.form.value; // Get form data
      console.log('Form Submitted applying', Data);

      this.adminService.loginAdmin(Data).subscribe({
        next: (response) => {
          console.log('Form submitted successfully:', response);

          this.router.navigate(['dashboard/home']);
          const token = response.token;  // Assuming the token is in the response
          localStorage.setItem('authToken', token);  // Storing the token
          console.log('Token stored in localStorage');
        },
        error: (err) => {
          console.error('Error submitting form:', err);
        },
      });
    }
  }
}
