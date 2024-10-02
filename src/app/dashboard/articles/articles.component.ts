import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { TableComponent } from '../table/table.component';
import { PostsService } from '../posts.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { RouterModule } from '@angular/router';
import { Post } from '../dashboard';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    NavComponent,
    TableComponent,
    LoadingSpinnerComponent,
    RouterModule,
  ],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
})
export class ArticlesComponent implements OnInit {
  articles: Post[] = [];
  isLoading: boolean = true;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles() {
    this.isLoading = true;
    this.postsService.getArticles().subscribe((res) => {
      this.articles = res.data;
      this.isLoading = false;
    });
  }

  onPostDeleted() {
    this.fetchArticles();
  }
}
