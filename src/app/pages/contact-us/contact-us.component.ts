import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { FormsContainerComponent } from './forms-container/forms-container.component';
import { FormComponent } from './form/form.component';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FormsContainerComponent,
    FormComponent,
    FormsModule,
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {
  onSubmitConsultationForm(formData: NgForm) {
    if (formData.form.invalid) {
      Object.keys(formData.form.controls).forEach((field) => {
        const control = formData.form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      // Handle valid form submission and send it to the back end
      console.log('Form Submitted Consultation', formData.form.value);
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
      console.log('Form Submitted Proposal', formData.form.value);
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
      console.log('Form Submitted contact us', formData.form.value);
    }
  }

  // WE HAVE TO RENAME THE INPUTS BEFORE SENDING TO THE BACK END
}
