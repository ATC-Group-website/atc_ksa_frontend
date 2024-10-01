import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PostsService } from '../posts.service';
import { AdminService } from '../admin.service';
import { NavComponent } from '../nav/nav.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-post',
  standalone: true,
  imports: [RouterModule, FormsModule, NavComponent],
  templateUrl: './add-new-post.component.html',
  styleUrl: './add-new-post.component.css',
})
export class AddNewPostComponent {
  selectedBase64Image: string | null = null;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private postsService: PostsService,
    private adminService: AdminService,
    private toastr: ToastrService,
  ) {}

  logoutAdmin() {
    this.adminService.logoutAdmin();
    this.router.navigate(['/home']);
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
      console.log('Form Submitted applying', Data);

      this.postsService.addPost(Data).subscribe({
        next: (response) => {
          console.log('Form submitted successfully:', response);

          console.log('post added ');
          this.toastr.success('Post added successfully');
          postData.form.reset();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error submitting form:', err);
          this.isLoading = false;
        },
      });
    }
  }

  // Handle file selection and convert to Base64
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedBase64Image = e.target.result; // Store Base64 string
      };
      reader.readAsDataURL(file); // Converts the file to Base64
    }
  }
}
