import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PlatformHelper {
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  scrollTop() {
    if (this.isBrowser) {
      window.scrollTo(0, 0);
    }
  }

  checkIfBrowser() {
    return this.isBrowser;
  }
}
