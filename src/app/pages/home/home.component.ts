import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { ArticlesService } from '../insights/articles.service';

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
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  scrollToSection(): void {
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
