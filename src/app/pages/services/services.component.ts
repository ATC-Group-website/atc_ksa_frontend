import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

}
