import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PostsService } from '../posts.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [RouterModule, LoadingSpinnerComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})
export class AdminHomeComponent implements OnInit {
  constructor(
    private router: Router,
    private postsService: PostsService,
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  articles: any[] = [];
  isLoading: any = true;

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  addPost() {
    this.router.navigate(['dashboard/new-post']);
  }

  getPosts() {
    this.postsService.getPosts().subscribe({
      next: (response) => {
        this.articles = response.blogs.reverse();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching posts', err);
      },
    });
  }
}
