import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LanguageSwitchService } from '../../services/language-switch.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  // constructor(
  //   private router: Router,
  //   private languageSwitchService: LanguageSwitchService,
  //   private renderer: Renderer2,
  // ) {
  //   // this.router.events.subscribe(() => {
  //   //   this.showConsultationButton = !this.router.url.includes('career');
  //   // });
  // }

  // ngOnInit(): void {
  //   document.documentElement.setAttribute('dir', 'ltr');
  // }

  // switchLanguage(language: string, dropdown: HTMLElement) {
  //   console.log(`Switching to language: ${language}`);

  //   this.renderer.addClass(dropdown, 'hidden');
  //   this.languageSwitchService.setLanguage(language);
  // }

  constructor(
    private router: Router,
    private languageSwitchService: LanguageSwitchService,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.languageSwitchService.direction$.subscribe((direction) => {
      document.documentElement.setAttribute('dir', direction);
    });
  }

  switchLanguage(language: string, dropdown: HTMLElement) {
    console.log(`Switching to language: ${language}`);
    this.renderer.addClass(dropdown, 'hidden');
    this.languageSwitchService.setLanguage(language);
  }
}
