import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-pro-training',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './pro-training.component.html',
  styleUrl: './pro-training.component.css'
})
export class ProTrainingComponent {

}
