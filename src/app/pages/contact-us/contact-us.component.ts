import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { FormsContainerComponent } from './forms-container/forms-container.component';
import { FormComponent } from './form/form.component';
import { FormsModule, NgForm } from '@angular/forms';
import { NgMapsComponent } from './ng-maps/ng-maps.component';
import { ContactUsService } from './contact-us.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FormsContainerComponent,
    FormComponent,
    FormsModule,
    NgMapsComponent,
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {
  constructor(private contactusService: ContactUsService) {}

  onSubmitConsultationForm(formData: NgForm) {
    if (formData.form.invalid) {
      Object.keys(formData.form.controls).forEach((field) => {
        const control = formData.form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      // Handle valid form submission and send it to the back end
      // const Data = formData.form.value; // Get form data
      const full_name =
        formData.form.controls['first_name_consultation'].value +
        ' ' +
        formData.form.controls['last_name_consultation'].value;

      const Data = {
        sender: formData.form.controls['email_consultation'].value,
        receiver: 'online@atc.com.eg',
        type: 'consultation',
        // type: 'proposal',
        // type: 'contact_us',
        body: formData.form.controls['inquiries_consultation'].value,
        company_name: formData.form.controls['company_name_consultation'].value,
        name: full_name,
        phone_number: formData.form.controls['phone_number_consultation'].value,
        attachments: [],
      };
      console.log('Form Submitted applying', Data);

      this.contactusService.contact_us(Data).subscribe({
        next: (response) => {
          console.log('Form submitted successfully:', response);
        },
        error: (err) => {
          console.error('Error submitting form:', err);
        },
      });
    }
  }

  onSubmitProposalForm(formData: NgForm) {
    if (formData.form.invalid) {
      Object.keys(formData.form.controls).forEach((field) => {
        const control = formData.form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      // Handle valid form submission and send it to the back end
      const Data = formData.form.value; // Get form data
      console.log('Form Submitted applying', Data);

      this.contactusService.contact_us(Data).subscribe({
        next: (response) => {
          console.log('Form submitted successfully:', response);
        },
        error: (err) => {
          console.error('Error submitting form:', err);
        },
      });
    }
  }

  onSubmitContactUsForm(formData: NgForm) {
    if (formData.form.invalid) {
      Object.keys(formData.form.controls).forEach((field) => {
        const control = formData.form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      // Handle valid form submission and send it to the back end
      const Data = formData.form.value; // Get form data
      console.log('Form Submitted applying', Data);

      this.contactusService.contact_us(Data).subscribe({
        next: (response) => {
          console.log('Form submitted successfully:', response);
        },
        error: (err) => {
          console.error('Error submitting form:', err);
        },
      });
    }
  }

  // WE HAVE TO RENAME THE INPUTS BEFORE SENDING TO THE BACK END
}
