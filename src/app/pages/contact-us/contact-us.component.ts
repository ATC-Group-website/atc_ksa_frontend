import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { FormsContainerComponent } from './forms-container/forms-container.component';
import { FormComponent } from './form/form.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactUsService } from './contact-us.service';
import { NgOptimizedImage } from '@angular/common';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { Meta, Title } from '@angular/platform-browser';
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
export class ContactUsComponent implements OnInit {
  isLoadingConsultation: boolean = false;
  isLoadingProposal: boolean = false;
  isLoadingContantUs: boolean = false;

  constructor(
    private contactusService: ContactUsService,
    private titleService: Title,
    private metaService: Meta,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Contact Us |  ATC Sobol Al-Khebra');

    // Set the meta tags
    this.metaService.addTags([
      {
        name: 'description',
        content:
          'Get in touch with ATC Sobol Al-Khebra today. Whether you need a personalized consultation, want to request a proposal, or simply have a question, our team of experts is here to help. Visit one of our four locations, call us, or schedule an appointment to achieve your business goals.',
      },
      {
        name: 'keywords',
        content:
          'ATC Sobol Al-Khebra contact, book consultation ATC Sobol Al-Khebra, request proposal ATC sobol al-khebra, contact accounting experts, ATC business consultation, Sobol Al-Khebra locations, accounting firm Saudi Arabia',
      },
    ]);
  }

  onSubmitConsultationForm(formData: NgForm) {
    if (formData.form.invalid) {
      Object.keys(formData.form.controls).forEach((field) => {
        const control = formData.form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      this.isLoadingConsultation = true;
      const Data = {
        sender: formData.form.controls['email_consultation'].value,
        // receiver: 'mostafa-ashraf@atc.com.eg',
        receiver: 'info@atcksa.com',
        type: 'consultation',
        body: formData.form.controls['inquiries_consultation'].value,
        company_name: formData.form.controls['company_name_consultation'].value,
        name: formData.form.controls['name_consultation'].value,
        job_title: formData.form.controls['title_consultation'].value,
        phone_number: formData.form.controls['phone_number_consultation'].value,
        attachments: [],
      };
      this.contactusService.contact_us(Data).subscribe({
        next: (response) => {
          console.log('Form submitted successfully:', response);
          formData.reset();
          this.isLoadingConsultation = false;
        },
        error: (err) => {
          console.error('Error submitting form:', err);
          this.isLoadingConsultation = false;
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
      this.isLoadingProposal = true;
      const Data = {
        sender: formData.form.controls['email_proposal'].value,
        // receiver: 'mostafa-ashraf@atc.com.eg',
        receiver: 'info@atcksa.com',
        type: 'proposal',
        body: formData.form.controls['details_proposal'].value,
        company_name: formData.form.controls['company_name_proposal'].value,
        name: formData.form.controls['name_proposal'].value,
        job_title: formData.form.controls['title_proposal'].value,
        phone_number: formData.form.controls['phone_number_proposal'].value,
        attachments: [],
      };

      this.contactusService.contact_us(Data).subscribe({
        next: (response) => {
          console.log('Form submitted successfully:', response);
          formData.reset();
          this.isLoadingProposal = false;
        },
        error: (err) => {
          console.error('Error submitting form:', err);
          this.isLoadingProposal = false;
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
      this.isLoadingContantUs = true;

      const full_name =
        formData.form.controls['first_name_contact_us'].value +
        ' ' +
        formData.form.controls['last_name_contact_us'].value;

      const Data = {
        sender: formData.form.controls['email_contact_us'].value,
        // receiver: 'mostafa-ashraf@atc.com.eg',
        receiver: 'info@atcksa.com',
        type: 'contact_us',
        body: formData.form.controls['comments_contact_us'].value,
        company_name: formData.form.controls['company_name_contact_us'].value,
        name: full_name,
        phone_number: formData.form.controls['phone_number_contact_us'].value,
        attachments: [],
      };

      this.contactusService.contact_us(Data).subscribe({
        next: (response) => {
          console.log('Form submitted successfully:', response);
          formData.reset();
          this.isLoadingContantUs = false;
        },
        error: (err) => {
          console.error('Error submitting form:', err);
          this.isLoadingContantUs = false;
        },
      });
    }
  }
}
