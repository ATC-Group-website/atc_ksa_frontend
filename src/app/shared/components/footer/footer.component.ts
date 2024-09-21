import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  constructor() {}

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      Object.keys(formData.form.controls).forEach((field) => {
        const control = formData.form.controls[field];
        control.markAsTouched({
          onlySelf: true,
        });
      });
    } else {
      // Handle valid form submission and send it to the back end
      const Data = formData.form.value; // Get form data

      // handle here the service that will send the email to the backend to subscribe to the news letter 
      // this.applicationsService.sendApplications(Data).subscribe({
      //   next: (response) => {
      //     console.log('Form submitted successfully:', response);
      //   },
      //   error: (err) => {
      //     console.error('Error submitting form:', err);
      //   },
      // });
    }
  }

  // not currently being used
  activeAddress: string | null = null;

  toggleAddress(addressId: string) {
    this.activeAddress = this.activeAddress === addressId ? null : addressId;
  }
}
