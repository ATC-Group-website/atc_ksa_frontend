import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { ArticlesService } from './articles.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { PostsService } from '../../dashboard/posts.service';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.css',
})
export class InsightsComponent implements OnInit {
  currentPageForArticle: number = 1;
  currentPageForNews: number = 1;
  currentPageForBlog: number = 1;
  totalPagesArticles!: number;
  totalPagesNews!: number;
  totalPagesBlogs!: number;
  articles: any[] = [];
  news: any[] = [];
  blogs: any[] = [];
  isLoadingArticles: boolean = true;
  isLoadingNews: boolean = true;
  isLoadingBlogs: boolean = true;
  items: number[] = [1, 2, 3];

  constructor(
    private router: Router,
    private postsService: PostsService,
  ) {}

  ngOnInit(): void {
    this.onPageChangeArticles(1);
    this.onPageChangeNews(1);
    this.onPageChangeBlogs(1);
  }

  onPageChangeArticles(page: number): void {
    if (
      this.totalPagesArticles &&
      page >= 1 &&
      page <= this.totalPagesArticles
    ) {
      this.currentPageForArticle = page;
      this.fetchArticles(page);
    } else if (!this.totalPagesArticles) {
      this.currentPageForArticle = page;
      this.fetchArticles(page);
    }
    const element = document.getElementById('articles');
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offset = -130;

      window.scrollTo({
        top: elementPosition + offset,
        behavior: 'smooth',
      });
    }
  }

  onPageChangeNews(page: number): void {
    if (this.totalPagesNews && page >= 1 && page <= this.totalPagesNews) {
      this.currentPageForNews = page;
      this.fetchNews(page);
    } else if (!this.totalPagesNews) {
      this.currentPageForNews = page;
      this.fetchNews(page);
    }
    const element = document.getElementById('news');
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offset = -130;

      window.scrollTo({
        top: elementPosition + offset,
        behavior: 'smooth',
      });
    }
  }

  onPageChangeBlogs(page: number): void {
    if (this.totalPagesBlogs && page >= 1 && page <= this.totalPagesBlogs) {
      this.currentPageForBlog = page;
      this.fetchNews(page);
    } else if (!this.totalPagesBlogs) {
      this.currentPageForBlog = page;
      this.fetchNews(page);
    }
    const element = document.getElementById('blogs');
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offset = -130;

      window.scrollTo({
        top: elementPosition + offset,
        behavior: 'smooth',
      });
    }
  }

  fetchArticles(pageNum: number) {
    this.isLoadingArticles = true;

    this.postsService.getArticlesInsights(pageNum).subscribe({
      next: (res) => {
        this.articles = res.data;
        this.totalPagesArticles = res.last_page;

        this.isLoadingArticles = false;
      },
      error: (err) => {
        console.error('Error fetching articles:', err);
        this.isLoadingArticles = false;
      },
    });
  }

  // Fetch News
  fetchNews(pageNum: number) {
    this.isLoadingNews = true;

    this.postsService.getNewsInsights(pageNum).subscribe({
      next: (res) => {
        this.news = res.data;
        this.totalPagesNews = res.last_page;

        this.isLoadingNews = false;
      },
      error: (err) => {
        console.error('Error fetching news:', err);
        this.isLoadingNews = false;
      },
    });
  }

  // fetch blogs
  fetchBlogs(pageNum: number) {
    this.isLoadingBlogs = true;

    this.postsService.getBlogsInsights(pageNum).subscribe({
      next: (res) => {
        this.blogs = res.data;
        this.totalPagesBlogs = res.last_page;

        this.isLoadingBlogs = false;
      },
      error: (err) => {
        console.error('Error fetching blogs:', err);
        this.isLoadingBlogs = false;
      },
    });
  }

  navigateToDetails(id: any) {
    this.router.navigate(['/insights', id]);
  }
}
