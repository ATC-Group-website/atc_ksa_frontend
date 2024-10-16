import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-insight-details',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, LoadingSpinnerComponent],
  templateUrl: './insight-details.component.html',
  styleUrl: './insight-details.component.css',
})
export class InsightDetailsComponent implements OnInit {
  article!: any;
  isLoading: boolean = true;
  articleLanguage: string = 'ltr'; // Default to 'ltr'

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = parseInt(params['id'], 10);
      if (isNaN(id)) {
        this.isLoading = false;
        return;
      }
      this.articlesService.getPostDetails(id).subscribe({
        next: (res) => {
          this.article = res;
          this.isLoading = false;
          this.detectLanguage();
          this.setTitleAndDescription(
            this.article.title,
            this.article.description,
          );
        },
        error: (error) => {
          this.isLoading = false;
        },
      });
    });
  }

  detectLanguage() {
    if (this.article && this.article.description) {
      const content = this.article.description.trim();
      // Check if the first character is in the Arabic Unicode range
      const isArabic = /^[\u0600-\u06FF]/.test(content);
      this.articleLanguage = isArabic ? 'rtl' : 'ltr';
    }
  }

  // Method to set the title and description dynamically
  setTitleAndDescription(title: string, description: string) {
    this.titleService.setTitle(title || 'Default Page Title');

    // Update or add meta description
    this.metaService.updateTag({
      name: 'description',
      content: description || 'Default description',
    });
  }
}
