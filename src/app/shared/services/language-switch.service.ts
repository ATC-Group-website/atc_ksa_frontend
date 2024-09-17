import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageSwitchService {
  constructor() {}

  setLanguage(language: string) {
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }
}
