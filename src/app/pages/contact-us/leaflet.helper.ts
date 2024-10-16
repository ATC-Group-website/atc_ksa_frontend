import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeafletHelper {
  loadLeaflet(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (typeof (window as any).L !== 'undefined') {
        resolve((window as any).L);
      } else {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
        script.onload = () => {
          resolve((window as any).L);
        };
        script.onerror = () => {
          reject('Failed to load Leaflet library');
        };
        document.head.appendChild(script);
      }
    });
  }
}
