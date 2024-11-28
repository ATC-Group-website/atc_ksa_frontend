import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

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
  gallery_images: any[] = [];

  isModalOpen = false;
  isGalleryModalOpen = false;

  post: any;

  isLoading: boolean = true;
  isUploadingImage: boolean = false;

  selectedGalleryImages: any = {
    images: [],
  };

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

  // load post details
  loadPost(id: number): void {
    this.postsService.getSinglePost(id).subscribe({
      next: (data) => {
        this.post = data;
        // console.log(data);
        this.gallery_images = data.images_urls.filter(
          (imageUrl: any) => imageUrl.type === 'gallery',
        );
        this.isLoading = false;
      },
      error: (err) => {
        this.toastr.warning("This post doesn't exist");
        this.isLoading = false;
      },
    });
  }

  // change main image modal
  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  // update post title or description
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
        });
    }
  }

  // update main image
  onUpdateImage(imageData: NgForm): void {
    if (imageData.form.invalid) {
      Object.keys(imageData.form.controls).forEach((field) => {
        const control = imageData.form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    } else if (this.selectedFile) {
      this.isUploadingImage = true;
      const ImageData = {
        base64Image: this.selectedBase64Image,
        title: this.selectedFile.name,
        type: 'main',
      };

      const id = this.post.id;

      this.postsService.changePostImage(id, ImageData).subscribe({
        next: (response) => {
          this.isUploadingImage = false;
          this.closeModal();
          this.toastr.success(`Image updated successfully`);
          const postId = this.route.snapshot.params['id'];
          this.loadPost(postId);
        },
        error: (err) => {
          this.isUploadingImage = false;
          console.error('Error submitting form', err);
        },
      });
    }
  }

  // handling main image file
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

  // open gallery modal
  openGalleryModal(): void {
    this.isGalleryModalOpen = true;
  }

  // close gallery modal
  closeGalleryModal(): void {
    this.isGalleryModalOpen = false;
  }

  // update gallery images
  onaddGalleryImages(imagesData: NgForm): void {
    if (imagesData.form.invalid) {
      Object.keys(imagesData.form.controls).forEach((field) => {
        const control = imagesData.form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }
    if (this.selectedGalleryImages.images.length > 0) {
      this.isUploadingImage = true;

      const id = this.post.id;

      // Create an array of observables for each image upload
      const uploadObservables = this.selectedGalleryImages.images.map(
        (image: any) => {
          const imageData = {
            base64Image: image.base64Image,
            title: image.title,
            type: image.type,
          };
          return this.postsService.changePostImage(id, imageData); // Each upload request as an observable
        },
      );

      // Use forkJoin to wait until all uploads complete
      forkJoin(uploadObservables).subscribe({
        next: (responses) => {
          this.toastr.success('All images uploaded successfully');
          const postId = this.route.snapshot.params['id'];
          this.loadPost(postId); // Reload post after uploading images
        },
        error: (err) => {
          this.toastr.error('Error uploading one or more images');
          console.error('Error uploading images', err);
        },
        complete: () => {
          this.isUploadingImage = false; // Set to false only when all uploads complete
          this.selectedGalleryImages = { images: [] }; // Clear images array
        },
      });

      // // Loop over each image and upload separately
      // this.selectedGalleryImages.images.forEach((image: any) => {
      //   const imageData = {
      //     base64Image: image.base64Image,
      //     title: image.title,
      //     type: image.type,
      //   };

      //   this.postsService.changePostImage(id, imageData).subscribe({
      //     next: (response) => {
      //       this.toastr.success(`Image ${image.title} uploaded successfully`);
      //       const postId = this.route.snapshot.params['id'];
      //       this.loadPost(postId);
      //     },
      //     error: (err) => {
      //       this.toastr.error('Uploading image failed');
      //       console.error(`Error uploading image ${image.title}`, err);
      //     },
      //   });
      // });
      // this.isUploadingImage = false;
      // this.selectedGalleryImages = {
      //   images: [],
      // };
    }
  }

  // handling gallery images
  onGalleryImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files: FileList = input.files;

      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedGalleryImages.images.push({
            base64Image: e.target.result,
            title: file.name,
            type: 'gallery',
          });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(id: number) {
    this.postsService.removeSingleImage(id).subscribe({
      next: (data) => {
        this.toastr.success(`Image removed successfully`);
        this.closeGalleryModal();
        const postId = this.route.snapshot.params['id'];
        this.loadPost(postId);
      },
      error: (err) => {
        // console.log(err);
      },
    });
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

  goBack() {
    this.location.back();
  }
}
