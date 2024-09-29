import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { TableComponent } from '../table/table.component';
import { PostsService } from '../posts.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    NavComponent,
    TableComponent,
    LoadingSpinnerComponent,
    RouterModule,
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  news: any[] = [];
  isLoading: boolean = true;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews() {
    this.isLoading = true;
    this.postsService.getNews().subscribe((res) => {
      this.news = res.data;
      this.isLoading = false;
    });
  }
}
