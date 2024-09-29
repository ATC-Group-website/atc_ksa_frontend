import { Component } from '@angular/core';
import { PostsService } from '../posts.service';
import { LoadingSpinnerComponent } from "../../shared/components/loading-spinner/loading-spinner.component";
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoadingSpinnerComponent, NavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isLoading: boolean = true;

  articlesCount?: number;
  newsCount?: number;
  blogsCount?: number;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.postsService.getPostsCount().subscribe((res) => {
      this.articlesCount = res.Article;
      this.newsCount = res.News;
      this.blogsCount = res.Blogs;
      this.isLoading = false;
    });
  }
}
