import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LanguageSwitchService } from '../../services/language-switch.service';

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

  constructor(
    private router: Router,
    private languageSwitchService: LanguageSwitchService,
  ) {
    this.router.events.subscribe(() => {
      this.showConsultationButton = !this.router.url.includes('career');
    });
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

}
