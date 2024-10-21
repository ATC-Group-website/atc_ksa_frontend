import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { ApplicationsService } from './applications.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule, FormsModule],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.css',
})
export class CareersComponent implements OnInit {
  selectedBase64File: string | null = null;
  selectedFile: File | null = null; // Store the file object separately
  isLoading: boolean = false;
  // message: string | null = null;

  constructor(
    private applicationsService: ApplicationsService,
    private titleService: Title,
    private metaService: Meta,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Career | ATC Sobol Al-Khebra');

    this.metaService.updateTag({
      name: 'description',
      content:
        'Explore rewarding career opportunities at ATC Sobol Al-Khebra. We are seeking dedicated professionals in Taxation, Zakat, Auditing, Accounting, and Financial Consulting.',
    });

    this.metaService.updateTag({
      name: 'keywords',
      content:
        'Careers, Jobs, ATC Sobol Al-Khebra, Taxation, Zakat, Auditing, Accounting, Financial Consulting, apply atc ksa, apply atc sobol al-khebra, jobs atc ksa, jobs atc sobol al-khebra',
    });
  }

  scrollToSection(): void {
    const element = document.getElementById('apply_now');
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offset = -170;

      window.scrollTo({
        top: elementPosition + offset,
        behavior: 'smooth',
      });
    }
  }

  onSubmitForm(formData: NgForm) {
    if (formData.form.invalid) {
      Object.keys(formData.form.controls).forEach((field) => {
        const control = formData.form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      this.isLoading = true;
      // Ensure a file has been selected
      if (!this.selectedBase64File || !this.selectedFile) {
        console.error('No valid file selected');
        return;
      }
      // Handle valid form submission and send it to the back end
      const Data = {
        name: formData.form.controls['name'].value,
        email: formData.form.controls['email'].value,
        message: formData.form.controls['message'].value,
        attachments: [
          {
            filename: this.selectedFile.name, // Accessing the file's name
            content: this.selectedBase64File.split(',')[1], // Base64 content
            mime_type: this.selectedFile.type, // MIME type from the file
          },
        ],
      };

      this.applicationsService.sendApplications(Data).subscribe({
        next: (response) => {
          // this.message =
          //   'Thank you for reaching out to ATC Sobol Al-Khebra. We have received your application and will contact you if your qualifications align with any of our open positions.';

          this.isLoading = false;
          formData.reset();
          // this.clearMessageAfterDelay(5000);
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error submitting form:', err);
        },
      });
    }
  }

  // Handle file selection and convert to Base64
  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file && file.type === 'application/pdf') {
      this.selectedFile = file; // Store the file object

      // Convert to base64
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedBase64File = reader.result as string; // Store base64 string
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedBase64File = null;
      this.selectedFile = null;
    }
  }
}
