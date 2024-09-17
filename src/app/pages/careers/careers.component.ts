import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { ApplicationsService } from './applications.service';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule, FormsModule],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.css',
})
export class CareersComponent {
  constructor(private applicationsService: ApplicationsService) {}

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
      // Handle valid form submission and send it to the back end
      const Data = formData.form.value; // Get form data
      console.log('Form Submitted applying', Data);

      this.applicationsService.sendApplications(Data).subscribe({
        next: (response) => {
          console.log('Form submitted successfully:', response);
        },
        error: (err) => {
          console.error('Error submitting form:', err);
        },
      });
    }
  }
}
