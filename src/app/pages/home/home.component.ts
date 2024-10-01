import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { ArticlesService } from '../insights/articles.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  articles: any[] = [];

  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Home | ATC KSA');
    this.metaService.updateTag({
      name: 'description',
      content:
        'ATC stands as a leading firm in the MENA Region, offering an extensive array of Accounting, Tax, Zakat and Financial Consulting Services tailored to meet the diverse needs of both businesses and individuals.',
    });

    // Add more meta tags (optional)
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'atc ksa, atc, ksa ashraf abdel ghani, tax ksa , zakat ksa, zakat, audit ksa, audit ',
    });

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
      },
      error: (err) => {
        console.error('Error fetching posts for page 1:', err);
      },
    });
  }

  navigateToDetails(id: number) {
    this.router.navigate([`/insights/${id}`]);
  }
}
