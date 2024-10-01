// import { Component, OnInit } from '@angular/core';
// import * as L from 'leaflet';
// @Component({
//   selector: 'app-ng-maps',
//   standalone: true,
//   imports: [],
//   templateUrl: './ng-maps.component.html',
//   styleUrl: './ng-maps.component.css',
// })
// export class NgMapsComponent {
//   private map: any;

//   constructor() {}

//   ngOnInit(): void {
//     this.initMap();
//   }

//   private initMap(): void {
//     this.map = L.map('map').setView([24.516921473740936, 44.41538469399682], 6);

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       maxZoom: 19,
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(this.map);

//     // Define a custom red SVG icon
//     const redSvgIcon = L.divIcon({
//       className: 'custom-div-icon', // Custom class to avoid default Leaflet styles
//       html: `
//      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="red"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>`,
//       iconSize: [20, 20], // Adjust size if necessary
//       iconAnchor: [12, 24], // Point of the icon corresponding to marker's location
//     });

//     // Explicitly type the locations array
//     const locations: [number, number, string][] = [
//       [24.67536299976543, 46.691295648075176, 'Riyadh'],
//       [21.52203468274559, 39.18051159395575, 'Jeddah'],
//       [21.37648630927583, 39.87439790845652, 'Mekkah'],
//       [26.290547007919674, 50.218391305392615, 'Al Khobar'],
//     ];

//     // Iterate over the locations and add markers
//     locations.forEach(([lat, lng, popupText]: [number, number, string]) => {
//       const marker = L.marker([lat, lng], { icon: redSvgIcon }).addTo(this.map);
//       marker.bindPopup(popupText);
//     });
//   }
// }
