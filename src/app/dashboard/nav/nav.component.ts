import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  constructor(
    private adminService: AdminService,
    private router: Router,
  ) {}

  sidebarVisible = false;

  toggleSidebar(event: Event) {
    this.sidebarVisible = !this.sidebarVisible;
    event.stopPropagation();
  }

  // Close the sidebar when clicking outside of it
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.sidebarVisible) {
      this.sidebarVisible = false;
    }
  }

  logoutAdmin() {
    this.adminService.logoutAdmin();
    this.router.navigate(['/home']);
  }
}
