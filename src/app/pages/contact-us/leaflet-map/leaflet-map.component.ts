import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { LeafletHelper } from '../leaflet.helper';
import { isPlatformBrowser } from '@angular/common';

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
    // Initialize your map here
    console.log('Leaflet library initialized:', leafletLib);
    const map = leafletLib
      .map('map')
      .setView([24.516921473740936, 44.41538469399682], 6); // Set initial view with zoom level

    // Set higher maxZoom to allow more zoom levels
    leafletLib
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, // Set a higher max zoom level
        attribution: '© OpenStreetMap',
      })
      .addTo(map);
    // Define a custom red SVG icon
    const redSvgIcon = leafletLib.divIcon({
      className: 'custom-div-icon', // Custom class to avoid default Leaflet styles
      html: `
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="red"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>`,
      iconSize: [20, 20], // Adjust size if necessary
      iconAnchor: [12, 24], // Point of the icon corresponding to marker's location
    });

    // Create markers for each set of coordinates
    const coordinates = [
      [24.67536299976543, 46.691295648075176],
      [21.52203468274559, 39.18051159395575],
      [21.37648630927583, 39.87439790845652],
      [26.290547007919674, 50.218391305392615],
    ];

    coordinates.forEach((coord) => {
      const marker = leafletLib.marker(coord, { icon: redSvgIcon }).addTo(map);
      // marker.bindPopup().openPopup();
    });
  }
  // map: any;

  // constructor(
  //   private leafletHelper: LeafletHelper,
  //   @Inject(PLATFORM_ID) private platformId: Object,
  // ) {}

  // ngOnInit() {
  //   // // Use isPlatformBrowser to check if we're in the browser
  //   // if (isPlatformBrowser(this.platformId)) {
  //   //   this.leafletHelper.loadLeaflet().then((leafletLib) => {
  //   //     this.initMap(leafletLib);
  //   //   });
  //   // }

  //   // Use isPlatformBrowser to check if we're in the browser
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.leafletHelper
  //       .loadLeaflet()
  //       .then((leafletLib) => {
  //         // Ensure latLng exists in the loaded library
  //         if (leafletLib && leafletLib.latLng) {
  //           this.initMap(leafletLib);
  //         } else {
  //           console.error(
  //             'Leaflet library not fully loaded or missing latLng function',
  //           );
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Error loading Leaflet library:', error);
  //       });
  //   }
  // }

  // initMap(lib: any): void {
  //   if (!lib) {
  //     return;
  //   }
  //   // Initialize the map first
  //   this.map = lib.map('map', {
  //     center: lib.latLng(24.516921473740936, 44.41538469399682),
  //     zoom: 6, // Set an initial zoom level
  //   });

  //   // Now, add the tile layer
  //   lib
  //     .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //       maxZoom: 19,
  //       attribution:
  //         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //     })
  //     .addTo(this.map); // Add the tile layer to the map

  //   // Define a custom red SVG icon
  //   const redSvgIcon = lib.divIcon({
  //     className: 'custom-div-icon', // Custom class to avoid default Leaflet styles
  //     html: `
  //        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="red"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>`,
  //     iconSize: [20, 20], // Adjust size if necessary
  //     iconAnchor: [12, 24], // Point of the icon corresponding to marker's location
  //   });

  //   // Explicitly type the locations array
  //   const locations: [number, number, string][] = [
  //     [24.67536299976543, 46.691295648075176, 'Riyadh'],
  //     [21.52203468274559, 39.18051159395575, 'Jeddah'],
  //     [21.37648630927583, 39.87439790845652, 'Mekkah'],
  //     [26.290547007919674, 50.218391305392615, 'Al Khobar'],
  //   ];

  //   // Iterate over the locations and add markers
  //   locations.forEach(([lat, lng, popupText]: [number, number, string]) => {
  //     const marker = lib
  //       .marker([lat, lng], { icon: redSvgIcon })
  //       .addTo(this.map);
  //     marker.bindPopup(popupText);
  //   });
  // }

  // initMap(lib: any): void {
  //   this.map = lib.map('map', {
  //     layers: [
  //       lib
  //         .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //           maxZoom: 19,
  //           attribution:
  //             '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //         })
  //         .addTo(this.map),
  //     ],
  //     center: lib.latLng(24.516921473740936, 44.41538469399682),
  //   });

  //   // Define a custom red SVG icon
  //   const redSvgIcon = lib.divIcon({
  //     className: 'custom-div-icon', // Custom class to avoid default Leaflet styles
  //     html: `
  //          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="red"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>`,
  //     iconSize: [20, 20], // Adjust size if necessary
  //     iconAnchor: [12, 24], // Point of the icon corresponding to marker's location
  //   });

  //   // Explicitly type the locations array
  //   const locations: [number, number, string][] = [
  //     [24.67536299976543, 46.691295648075176, 'Riyadh'],
  //     [21.52203468274559, 39.18051159395575, 'Jeddah'],
  //     [21.37648630927583, 39.87439790845652, 'Mekkah'],
  //     [26.290547007919674, 50.218391305392615, 'Al Khobar'],
  //   ];

  //   // Iterate over the locations and add markers
  //   locations.forEach(([lat, lng, popupText]: [number, number, string]) => {
  //     const marker = lib
  //       .marker([lat, lng], { icon: redSvgIcon })
  //       .addTo(this.map);
  //     marker.bindPopup(popupText);
  //   });
  // }

  // initMap(lib: any): void {
  //   this.map = lib.map('map', {
  //     layers: [
  //       lib.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //         maxZoom: 21,
  //         maxNativeZoom: 19,
  //         minZoom: 3,
  //         attribution: '...',
  //         noWrap: true,
  //       }),
  //     ],
  //     zoom: 10,
  //     center: lib.latLng(24.516921473740936, 44.41538469399682),
  //   });
  // }
}
