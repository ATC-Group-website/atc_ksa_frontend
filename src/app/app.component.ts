import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './shared/services/flowbite.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ATC_KSA';

  constructor(
    private router: Router,
    private flowbiteService: FlowbiteService,
  ) {}

  // ngOnInit(): void {
  //   this.flowbiteService.loadFlowbite((flowbite) => {});
  // }

  ngOnInit(): void {
    // Load Flowbite on initial load
    this.flowbiteService.loadFlowbite((flowbite) => {});

    // Listen to route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Reinitialize Flowbite after each route change
        this.flowbiteService.loadFlowbite((flowbite) => {
          // You can place any Flowbite-specific code here if necessary
        });
      }
    });
    console.log('its me ');
  }
}
