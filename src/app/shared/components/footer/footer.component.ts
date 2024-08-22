import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  activeAddress: string | null = null;

  toggleAddress(addressId: string) {
    this.activeAddress = this.activeAddress === addressId ? null : addressId;
  }
}
