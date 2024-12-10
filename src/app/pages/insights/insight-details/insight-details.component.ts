import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { Meta, Title } from '@angular/platform-browser';
import { map } from 'rxjs';

interface Image {
  id: number;
  path: string;
  type: string;
  title: string;
}

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
  galleryImages: Image[] = [];
  articleLanguage: string = 'ltr'; // Default to 'ltr'
  selectedImage: {
    id: number;
    path: string;
    type: string;
    title: string;
  } | null = null;

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

          // Assuming res.imagesUrl is an array of image objects with a `type` property
          this.galleryImages = res.images_urls.filter(
            (image: any) => image.type === 'gallery',
          );

          // console.log('Filtered Gallery Images:', this.galleryImages);
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

  openModal(image: { id: number; path: string; type: string; title: string }) {
    this.selectedImage = image;
  }

  closeModal() {
    this.selectedImage = null;
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
