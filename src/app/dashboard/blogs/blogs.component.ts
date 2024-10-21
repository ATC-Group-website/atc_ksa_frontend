import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { PostsService } from '../posts.service';
import { TableComponent } from '../table/table.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { RouterModule } from '@angular/router';
import { Post } from '../dashboard';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [
    NavComponent,
    TableComponent,
    LoadingSpinnerComponent,
    RouterModule,
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent implements OnInit {
  blogs: Post[] = [];
  isLoading: boolean = true;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.fetchBlogs();
  }

  fetchBlogs() {
    this.isLoading = true;
    this.postsService.getBlogs().subscribe((res) => {
      this.blogs = res.data;
      this.isLoading = false;
    });
  }

  onPostDeleted() {
    this.fetchBlogs();
  }
}
