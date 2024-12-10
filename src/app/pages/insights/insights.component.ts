import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ArticlesService } from './articles.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule],
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

    // Fetch data for all categories on page load
    this.fetchPosts('articles', 3, this.categories['articles'].currentPage);
    this.fetchPosts('news', 3, this.categories['news'].currentPage);
    this.fetchPosts('blogs', 3, this.categories['blogs'].currentPage);
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
}
