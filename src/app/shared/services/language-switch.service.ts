import { Injectable, signal, Signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageSwitchService {
  // constructor() {}

  // setLanguage(language: string) {

  //   if (language === 'ar') {
  //     document.documentElement.setAttribute('dir', 'rtl');
  //   } else {
  //     document.documentElement.setAttribute('dir', 'ltr');
  //   }
  // }

  private directionSubject = new BehaviorSubject<string>('ltr');
  direction$ = this.directionSubject.asObservable();

  constructor() {}

  setLanguage(language: string) {
    const direction = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', direction);
    this.directionSubject.next(direction);
  }
}
