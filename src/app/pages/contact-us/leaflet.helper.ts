// import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';

// @Injectable({
//   providedIn: 'root',
// })
// export class LeafletHelper {
//   private leafletLib: any = null;

//   constructor(@Inject(PLATFORM_ID) private platformId: Object) {
//     if (isPlatformBrowser(this.platformId)) {
//       // Load Leaflet library in browser context
//       this.leafletLib = import('leaflet');
//     }
//   }

//   // async loadLeaflet(): Promise<any> {
//   //   if (this.leafletLib) {
//   //     return this.leafletLib;
//   //   }
//   //   throw new Error('Leaflet library not available');
//   // }

//   async loadLeaflet(): Promise<any> {
//     if (isPlatformBrowser(this.platformId)) {
//       if (!this.leafletLib) {
//         this.leafletLib = await import('leaflet'); // Import leaflet dynamically
//       }
//       return this.leafletLib;
//     } else {
//       return null;
//     }
//   }
// }

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeafletHelper {
  loadLeaflet(): Promise<any> {
    return new Promise((resolve, reject) => {
      // Check if Leaflet is already loaded
      if (typeof (window as any).L !== 'undefined') {
        resolve((window as any).L);
      } else {
        // Load Leaflet from CDN
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
        script.onload = () => {
          resolve((window as any).L); // Resolve with the loaded Leaflet library
        };
        script.onerror = () => {
          reject('Failed to load Leaflet library');
        };
        document.head.appendChild(script);
      }
    });
  }
}
