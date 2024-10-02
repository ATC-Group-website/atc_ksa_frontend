import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../posts.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { HttpClient } from '@angular/common/http';
import { ConvertImageService } from '../convert-image.service';

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

  post: any;

  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private location: Location,
    private convertImageService: ConvertImageService,
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.params['id'];
    this.loadPost(postId);
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

  changeImage() {}
  cancelChangeImage() {}

  loadPost(id: number): void {
    this.postsService.getSinglePost(id).subscribe((data) => {
      this.post = data;
      this.isLoading = false;
      console.log(data);
      console.log(data.images_urls[0].path);
      this.convertImageService
        .convertImageToBase64(data.images_urls[0].path)
        .subscribe({
          next: (base64Image: string) => {
            console.log(base64Image); // Here you get the Base64 image string
          },
          error: (error) => console.error('Error converting image:', error),
        });
    });
  }

  onUpdatePost(formData: NgForm): void {
    if (formData.invalid) {
      return;
    } else {
      // const updatedPost = {
      //   title: formData.form.controls['title'].value,
      //   description: formData.form.controls['description'].value,
      //   images: [
      //     {
      //       // base64Image: this.selectedBase64Image, // Use the Base64 image here
      //       base64Image: this.convertToBase64Image(
      //         this.post.images_urls[0].path,
      //       ),
      //       type: 'main',
      //     },
      //   ],
      //   category_id: this.post.category_id,
      // };
      // this.postsService
      //   .updatePost(this.post.id, updatedPost)
      //   .subscribe((res) => {
      //     console.log('updated successfully');
      //     this.location.back();
      //     console.log(res);
      //     // Handle successful update (e.g., navigate back or show a success message)
      //   });
      // Convert image to Base64 using the service
      // this.convertImageService
      //   .convertToBase64FromUrl(this.post.images_urls[0].path)
      //   .subscribe({
      //     next: (base64Image: string) => {
      //       const updatedPost = {
      //         title: formData.form.controls['title'].value,
      //         description: formData.form.controls['description'].value,
      //         images: [{ base64Image, type: 'main' }],
      //         category_id: this.post.category_id,
      //       };
      //       this.postsService
      //         .updatePost(this.post.id, updatedPost)
      //         .subscribe((res) => {
      //           console.log('updated successfully');
      //           this.location.back();
      //         });
      //     },
      //     error: (error) => console.error('Error converting image:', error),
      //   });
      // this.convertImageService
      //   .convertToBase64FromUrl(this.post?.images_urls[0].path)
      //   .subscribe({
      //     next: (base64Image: string) => {
      //       console.log(base64Image);
      //     },
      //     error: (err) => {
      //       console.log(err);
      //       console.log('error');
      //     },
      //   });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedBase64Image = e.target.result; // Store Base64 string
        };
        reader.readAsDataURL(file); // Converts the file to Base64
      }
    }
  }

  goBack() {
    this.location.back();
    console.log('cancel and go back');
  }
}
