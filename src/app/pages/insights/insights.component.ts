import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ArticlesService } from './articles.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { Meta, Title } from '@angular/platform-browser';

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
  categories: { [key: string]: any } = {
    articles: {
      data: [],
      currentPage: 1,
      totalPages: 1,
      isLoading: true,
    },
    news: {
      data: [],
      currentPage: 1,
      totalPages: 1,
      isLoading: true,
    },
    blogs: {
      data: [],
      currentPage: 1,
      totalPages: 1,
      isLoading: true,
    },
  };

  constructor(
    private articlesService: ArticlesService,
    private titleService: Title,
    private metaService: Meta,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Insights | ATC Sobol Al-Khebra');

    this.metaService.updateTag({
      name: 'description',
      content:
        'Stay ahead in accounting, taxation, and financial consulting with ATC Sobol Al-Khebra. Get expert analysis and industry trends.',
    });

    this.metaService.updateTag({
      name: 'keywords',
      content:
        'accounting insights, tax consulting, financial consulting, ATC Sobol Al-Khebra, Ashraf Abdel Ghani, auditing news, tax trends, business analysis, atc sobol al-khebra insights, atc ksa insights ',
    });

    // Fetch data for all categories on page load
    this.fetchPosts('articles', 3, this.categories['articles'].currentPage);
    this.fetchPosts('news', 3, this.categories['news'].currentPage);
    // this.fetchPosts('blogs', 3, this.categories['blogs'].currentPage);
  }

  fetchPosts(categoryKey: string, postsNum: number, pageNum: number) {
    const categoryNum = this.getCategoryNum(categoryKey);
    this.categories[categoryKey].isLoading = true;

    this.articlesService.fetchPosts(postsNum, categoryNum, pageNum).subscribe({
      next: (response) => {
        this.categories[categoryKey].data = response.data;
        this.categories[categoryKey].currentPage = response.current_page;
        this.categories[categoryKey].totalPages = response.last_page;
        this.categories[categoryKey].isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching posts for ' + categoryKey, err);
        this.categories[categoryKey].isLoading = false;
      },
    });
  }

  // Helper method to map categoryKey to category number
  getCategoryNum(categoryKey: string): number {
    switch (categoryKey) {
      case 'articles':
        return 1;
      case 'news':
        return 2;
      case 'blogs':
        return 3;
      default:
        return 1;
    }
  }

  // Generalized method to navigate to the next page
  nextPage(categoryKey: string) {
    if (
      this.categories[categoryKey].currentPage <
      this.categories[categoryKey].totalPages
    ) {
      this.categories[categoryKey].currentPage++;
      this.fetchPosts(categoryKey, 3, this.categories[categoryKey].currentPage);
    }
  }

  // Generalized method to navigate to the previous page
  prevPage(categoryKey: string) {
    if (this.categories[categoryKey].currentPage > 1) {
      this.categories[categoryKey].currentPage--;
      this.fetchPosts(categoryKey, 3, this.categories[categoryKey].currentPage);
    }
  }

  // Method to go to a specific page
  goToPage(categoryKey: string, pageNum: number) {
    this.categories[categoryKey].currentPage = pageNum;
    this.fetchPosts(categoryKey, 3, pageNum);
  }

  // to be deleted later ###########
  // articles: any[] = [];
  // currentPageForArticles: number = 1;
  // totalPagesForsArticles: number = 1;
  // isLoadingForArticles: boolean = true;

  // newss: any[] = [];
  // currentPageForNews: number = 1;
  // totalPagesForNews: number = 1;
  // isLoadingForNews: boolean = true;

  // blogs: any[] = [];
  // currentPageForBlogs: number = 1;
  // totalPagesForBlogs: number = 1;
  // isLoadingForBlogs: boolean = true;

  // constructor(private articlesService: ArticlesService) {}

  // ngOnInit(): void {
  //   // Fetch data for each category on page load
  //   this.fetchPosts(3, 1, this.currentPageForArticles);
  //   this.fetchPosts(3, 2, this.currentPageForNews);
  //   this.fetchPosts(3, 2, this.currentPageForBlogs);
  // }

  // fetchPosts(postsNum: number, categoryNum: number, pageNum: number) {
  //   this.articlesService.fetchPosts(postsNum, categoryNum, pageNum).subscribe({
  //     next: (response) => {
  //       if (categoryNum === 1) {
  //         this.articles = response.data;
  //         this.currentPageForArticles = response.current_page;
  //         this.totalPagesForsArticles = response.total;
  //         console.log(response);
  //         this.isLoadingForArticles = false;
  //       } else if (categoryNum === 2) {
  //         this.newss = response.data;
  //         this.currentPageForNews = response.current_page;
  //         this.totalPagesForNews = response.total;
  //         console.log(response);
  //         this.isLoadingForNews;
  //       } else if (categoryNum === 3) {
  //         this.blogs = response.data;
  //         this.currentPageForBlogs = response.current_page;
  //         this.totalPagesForBlogs = response.total;
  //         console.log(response);
  //         this.isLoadingForBlogs;
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  // // Method to navigate to the next page
  // nextPage(categoryNum: number) {
  //   if (
  //     categoryNum === 1 &&
  //     this.currentPageForArticles < this.totalPagesForsArticles
  //   ) {
  //     this.currentPageForArticles++;
  //     this.fetchPosts(3, 1, this.currentPageForArticles);
  //   } else if (
  //     categoryNum === 2 &&
  //     this.currentPageForNews < this.totalPagesForNews
  //   ) {
  //     this.currentPageForNews++;
  //     this.fetchPosts(3, 2, this.currentPageForNews);
  //   } else if (
  //     categoryNum === 3 &&
  //     this.currentPageForBlogs < this.totalPagesForBlogs
  //   ) {
  //     this.currentPageForBlogs++;
  //     this.fetchPosts(3, 3, this.currentPageForBlogs);
  //   }
  // }

  // // Method to navigate to the previous page
  // prevPage(categoryNum: number) {
  //   if (categoryNum === 1 && this.currentPageForArticles > 1) {
  //     this.currentPageForArticles--;
  //     this.fetchPosts(3, 1, this.currentPageForArticles);
  //   } else if (categoryNum === 2 && this.currentPageForNews > 1) {
  //     this.currentPageForNews--;
  //     this.fetchPosts(3, 2, this.currentPageForNews);
  //   } else if (categoryNum === 3 && this.currentPageForBlogs > 1) {
  //     this.currentPageForBlogs--;
  //     this.fetchPosts(3, 3, this.currentPageForBlogs);
  //   }
  // }
}
