import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-single-post',
  standalone: true,
  imports: [FormsModule, NavComponent, LoadingSpinnerComponent],
  templateUrl: './edit-single-post.component.html',
  styleUrl: './edit-single-post.component.css',
})
export class EditSinglePostComponent implements OnInit {
  selectedBase64Image: string | null = null;
  selectedFile: File | null = null;
  convertedImages: any[] = [];

  preSelectedImage: string | null = null;
  isImageBeingChanged: boolean = false;
  isModalOpen = false;

  post: any;

  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private location: Location,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.params['id'];
    this.loadPost(postId);
  }

  // Open modal
  openModal(): void {
    this.isModalOpen = true;
  }

  // Close modal
  closeModal(): void {
    this.isModalOpen = false;
  }

  getCategoryLabel(categoryId: number): string {
    switch (categoryId) {
      case 1:
        return 'Article';
      case 2:
        return 'News';
      case 3:
        return 'Blogs';
      default:
        return 'Unknown';
    }
  }

  loadPost(id: number): void {
    this.postsService.getSinglePost(id).subscribe({
      next: (data) => {
        this.post = data;
        console.log(data);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }

  onUpdatePost(formData: NgForm): void {
    if (formData.invalid) {
      return;
    } else {
      const updatedPost = {
        title: formData.form.controls['title'].value,
        description: formData.form.controls['description'].value,
        category_id: parseInt(formData.form.controls['category'].value, 10),
      };
      this.postsService
        .updatePost(this.post.id, updatedPost)
        .subscribe((res) => {
          this.toastr.success(`Post ${this.post.id} updated successfully`);
          // this.location.back();
        });
    }
  }

  onUpdateImage(imageData: NgForm): void {
    if (imageData.form.invalid) {
      Object.keys(imageData.form.controls).forEach((field) => {
        const control = imageData.form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      if (this.selectedFile) {
        const ImageData = {
          base64Image: this.selectedBase64Image,
          title: this.selectedFile.name,
          type: 'main',
        };

        const id = this.post.id;

        this.postsService.changePostImage(id, ImageData).subscribe({
          next: (response) => {
            this.closeModal();
            const postId = this.route.snapshot.params['id'];
            this.loadPost(postId);
          },
          error: (err) => {
            console.error('Error submitting form', err);
          },
        });
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      if (file) {
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedBase64Image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  goBack() {
    this.location.back();
  }
}
