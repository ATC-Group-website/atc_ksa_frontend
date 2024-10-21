import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ToastrService } from 'ngx-toastr';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-send-emails',
  standalone: true,
  imports: [FormsModule, NavComponent],
  templateUrl: './send-emails.component.html',
  styleUrl: './send-emails.component.css',
})
export class SendEmailsComponent implements OnInit {
  isLoading: boolean = false;
  selectedBase64File: string | null = null;

  constructor(
    private emailsService: PostsService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {}

  onSendEmail(formData: NgForm) {
    if (formData.form.invalid) {
      Object.keys(formData.form.controls).forEach((field) => {
        const control = formData.form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      this.isLoading = true;
      const Pdf = {
        base64pdf: this.selectedBase64File,
      };

      this.emailsService.sendEmail(Pdf).subscribe({
        next: (response) => {
          this.toastr.success('Email sent successfully');
          formData.form.reset();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error submitting form:', err);
          this.toastr.error('Error');
          this.isLoading = false;
        },
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const base64PDF = e.target.result.split(',')[1];
          this.selectedBase64File = base64PDF;
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
