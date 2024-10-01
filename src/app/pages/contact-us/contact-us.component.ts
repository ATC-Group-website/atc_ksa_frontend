import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { FormsContainerComponent } from './forms-container/forms-container.component';
import { FormComponent } from './form/form.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactUsService } from './contact-us.service';
import { NgOptimizedImage } from '@angular/common';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FormsContainerComponent,
    FormComponent,
    FormsModule,
    NgOptimizedImage,
    LeafletMapComponent,
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
      const Data = formData.form.value; // Get form data
      console.log('Form Submitted applying', Data);

      this.contactusService.bookConsultation(Data).subscribe({
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

      this.contactusService.requestProposal(Data).subscribe({
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

      this.contactusService.getInTouch(Data).subscribe({
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
