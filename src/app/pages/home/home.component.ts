import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ArticlesService } from '../insights/articles.service';
import { Meta, Title } from '@angular/platform-browser';
import { CountUpModule } from 'ngx-countup';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterModule,
    NgOptimizedImage,
    CountUpModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  articles: any[] = [];
  clients = 500;
  yearsOfExperience: number = 0;
  branches: number = 4;
  isLoading: boolean = true;

  constructor(
    private articlesService: ArticlesService,
    private titleService: Title,
    private metaService: Meta,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('ATC Sobol Al-Khebra');
    this.metaService.updateTag({
      name: 'description',
      content:
        'ATC Sobol Al-Khebra stands as one of the leading firms in the Kingdom of Saudi Arabia, offering an extensive array of Accounting, Tax, Zakat and Financial Consulting Services tailored to meet the diverse needs of both businesses and individuals.',
    });

    const startYear = 2018;
    const currentYear = new Date().getFullYear();
    this.yearsOfExperience = currentYear - startYear;

    this.fetchData();
  }

  scrollToSection(): void {
    if (
      typeof window !== 'undefined' &&
      typeof sessionStorage !== 'undefined'
    ) {
      const element = document.getElementById('our_services');
      if (element) {
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offset = -170;

        window.scrollTo({
          top: elementPosition + offset,
          behavior: 'smooth',
        });
      }
    }
  }

  fetchData(): void {
    this.articlesService.getPostsHome().subscribe({
      next: (response) => {
        this.articles = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching posts :', err);
        this.isLoading = false;
      },
    });
  }

  // Method to check text direction based on content
  getDirection(text: string): string {
    const arabicRegex = /[\u0600-\u06FF]/; // Regex to detect Arabic characters
    return arabicRegex.test(text) ? 'rtl' : 'ltr'; // If Arabic characters found, return 'rtl'
  }

  // Method to get the alignment based on content direction
  getAlignment(text: string): string {
    const arabicRegex = /[\u0600-\u06FF]/; // Regex to detect Arabic characters
    return arabicRegex.test(text) ? 'justify-start' : 'justify-end'; // RTL -> justify-start, LTR -> justify-end
  }
}
