import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PostsService } from '../../../dashboard/posts.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  message: string = '';

  constructor(private postsService: PostsService) {}

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      Object.keys(formData.form.controls).forEach((field) => {
        const control = formData.form.controls[field];
        control.markAsTouched({
          onlySelf: true,
        });
      });
    } else {
      const Data = formData.form.value;

      // Get form data
      this.postsService.subscribeNewsLetter(Data).subscribe({
        next: (response) => {
          this.message = response.message;
          formData.reset();
          this.clearMessageAfterDelay(5000); // Clear message after 5 seconds
        },
        error: (err) => {
          console.error('Error submitting form:', err);
        },
      });
    }
  }

  // not currently being used
  activeAddress: string | null = null;

  toggleAddress(addressId: string) {
    this.activeAddress = this.activeAddress === addressId ? null : addressId;
  }

  private clearMessageAfterDelay(delay: number): void {
    setTimeout(() => {
      this.message = '';
    }, delay);
  }
}
