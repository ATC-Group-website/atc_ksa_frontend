import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LeafletHelper } from '../leaflet.helper';

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  imports: [],
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.css',
})
export class LeafletMapComponent {
  private leafletLib: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private leafletHelper: LeafletHelper,
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Load Leaflet dynamically
      this.leafletHelper
        .loadLeaflet()
        .then((leafletLib) => {
          // Ensure latLng exists in the loaded library
          if (leafletLib && typeof leafletLib.latLng === 'function') {
            this.initMap(leafletLib);
          } else {
            console.error(
              'Leaflet library not fully loaded or missing latLng function',
            );
          }
        })
        .catch((error) => {
          console.error('Error loading Leaflet library:', error);
        });
    }
  }

  private initMap(leafletLib: any) {
    const map = leafletLib
      .map('map')
      .setView([24.516921473740936, 44.41538469399682], 6);

    leafletLib
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap',
      })
      .addTo(map);
    const redSvgIcon = leafletLib.divIcon({
      className: 'custom-div-icon',
      html: `
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="red"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>`,
      iconSize: [24, 24],
      iconAnchor: [12, 24],
    });

    // Create markers for each set of coordinates
    const coordinates: [number, number, string][] = [
      [21.376704, 39.875017, 'Mekkah'],
      [26.299960454044644, 50.22017512513515, 'Al Khobar'],
      [21.52168102841136, 39.18073648220928, 'Jeddah'],
      [24.67473903834323, 46.69131345618128, 'Riyadh'],
    ];

    // coordinates.forEach(([lat, lng, popupText]: [number, number, string]) => {
    //   const marker = leafletLib
    //     .marker([lat, lng], { icon: redSvgIcon })
    //     .addTo(map)
    //     .bindPopup(popupText)
    //     .openPopup();
    // });

    // Store the markers in an array so we can open their popups later
    const markers: any[] = [];

    coordinates.forEach(([lat, lng, popupText]: [number, number, string]) => {
      const marker = leafletLib
        .marker([lat, lng], { icon: redSvgIcon })
        .addTo(map)
        .bindPopup(popupText);
      // .openPopup();

      // add marker to last location
      // markers.push(marker);
    });

    // markers.forEach((marker) => {
    //   marker.openPopup();
    // });
  }
}
