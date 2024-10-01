import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-single-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-single-post.component.html',
  styleUrl: './edit-single-post.component.css',
})
export class EditSinglePostComponent {
  post: any; // Adjust type as needed

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService, // Ensure you have a service to fetch posts
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.params['id']; // Get post ID from route
    this.loadPost(postId); // Load the existing post
  }

  loadPost(id: number): void {
    this.postsService.getSinglePost(id).subscribe((data) => {
      this.post = data; // Set the post data for the form
    });
  }

  onUpdatePost(formData: NgForm): void {
    if (formData.invalid) {
      return;
    }

    const updatedPost = {
      ...this.post,
      title: formData.value.title,
      description: formData.value.description,
      // Handle image upload separately if needed
    };

    this.postsService.updatePost(this.post.id, updatedPost).subscribe(() => {
      // Handle successful update (e.g., navigate back or show a success message)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      // Handle the file upload if necessary
    }
  }
}
