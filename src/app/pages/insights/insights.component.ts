import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { ArticlesService } from './articles.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

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
  constructor(
    private router: Router,
    private articlesService: ArticlesService,
  ) {}
  currentPage: number = 1;
  totalPages: number = 10;
  // article: any;

  articles: any[] = [];
  news: any[] = [];
  blogs: any[] = [];
  isLoading: any = true;

  ngOnInit(): void {
    // this.goToPage(1);
    this.fetchData();
  }

  // goToPage(page: number): void {
  //   if (page >= 1 && page <= this.totalPages) {
  //     this.currentPage = page;
  //     // Fetch the data for the new page here by calling your API
  //     this.fetchData(page);
  //   }
  // }

  // fetchData(page: number): void {
  //   // this.apiService.getData(page).subscribe(response => {...});
  //   console.log(`Fetching data for page: ${page}`);

  // }

  fetchData(): void {
    this.articlesService.getPosts(2).subscribe({
      next: (response) => {
        // console.log(`Fetching data for page 1`, response);
        this.articles = response.data; // Store the first set of 3 posts
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching posts for page 1:', err);
      },
    });

    this.articlesService.getPosts(1).subscribe({
      next: (response) => {
        // console.log(`Fetching data for page 2`, response);
        this.news = response.data; // Store the second set of 3 posts
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching posts for page 2:', err);
      },
    });

    // this.articlesService.getPosts(3).subscribe({
    //   next: (response) => {
    //     console.log(`Fetching data for page 3`, response);
    //     this.blogs = response; // Store the third set of 3 posts
    //   },
    //   error: (err) => {
    //     console.error('Error fetching posts for page 3:', err);
    //   },
    // });
  }

  navigateToDetails(id: any) {
    this.router.navigate(['/insights', id]);
  }
}
