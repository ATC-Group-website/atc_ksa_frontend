import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LanguageSwitchService } from '../../services/language-switch.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(
    private languageSwitchService: LanguageSwitchService,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    // this.languageSwitchService.direction$.subscribe((direction) => {
    //   document.documentElement.setAttribute('dir', direction);
    // });
  }

  navbarVisible = false;

  toggleNavbar(event: Event) {
    this.navbarVisible = !this.navbarVisible;
    event.stopPropagation(); // Prevent event bubbling
  }

  // Close the navbar when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.navbarVisible = false;
  }

  switchLanguage(language: string, dropdown: HTMLElement) {
    console.log(`Switching to language: ${language}`);
    this.renderer.addClass(dropdown, 'hidden');
    this.languageSwitchService.setLanguage(language);
  }
}
