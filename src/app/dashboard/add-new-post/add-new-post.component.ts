import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PostsService } from '../posts.service';
import { NavComponent } from '../nav/nav.component';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-new-post',
  standalone: true,
  imports: [RouterModule, FormsModule, NavComponent, CommonModule],
  templateUrl: './add-new-post.component.html',
  styleUrl: './add-new-post.component.css',
})
export class AddNewPostComponent {
  selectedBase64Image: string | null = null;
  isLoading: boolean = false;
  titleInput: string = '';
  descInput: string = '';

  constructor(
    private postsService: PostsService,
    private toastr: ToastrService,
  ) {}

  // Function to detect if the input is Arabic
  isArabic(text: string): boolean {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text);
  }

  onAddNewPost(postData: NgForm) {
    if (postData.form.invalid) {
      Object.keys(postData.form.controls).forEach((field) => {
        const control = postData.form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      this.isLoading = true;
      const Data = {
        title: postData.form.controls['title'].value,
        description: postData.form.controls['description'].value,
        images: [
          {
            base64Image: this.selectedBase64Image, // Use the Base64 image here
            type: 'main',
          },
        ],
        category_id: postData.form.controls['category'].value,
      };

      this.postsService.addPost(Data).subscribe({
        next: (response) => {
          this.toastr.success('Post added successfully');
          postData.form.reset();
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
          this.selectedBase64Image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
