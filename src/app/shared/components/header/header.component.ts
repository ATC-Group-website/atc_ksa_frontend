import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  selectedLanguage: string = 'En (US)';

  selectLanguage(language: string): void {
    this.selectedLanguage = language;
  }

  showConsultationButton: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showConsultationButton = !this.router.url.includes('career');
    });
  }
}
