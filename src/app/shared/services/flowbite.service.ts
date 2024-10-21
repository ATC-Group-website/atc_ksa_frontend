import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class FlowbiteService {
  private flowbiteLoaded: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  loadFlowbite(callback: (flowbite: any) => void) {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.flowbiteLoaded) {
        import('flowbite').then((flowbite) => {
          this.flowbiteLoaded = true;
          callback(flowbite);
        });
      } else {
        // If Flowbite is already loaded, just call the callback without re-importing
        callback((window as any).flowbite); // Assuming Flowbite is globally available after loading
      }
    }
  }
}
