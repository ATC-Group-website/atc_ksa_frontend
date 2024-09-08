import { Component, Renderer2 } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  isLoading = true;

  constructor(private renderer: Renderer2) {}

  showLoadingSpinner() {
    this.isLoading = true;
    this.renderer.addClass(document.body, 'no-scroll');
  }

  hideLoadingSpinner() {
    this.isLoading = false;
    this.renderer.removeClass(document.body, 'no-scroll');
  }
}
