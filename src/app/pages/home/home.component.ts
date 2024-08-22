import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {


  // clients: number = 0;
  // years_of_experience: number = 0;
  // industries: number = 0;
  // branches: number = 0;

  // private observer: IntersectionObserver;
  // private observedElements: ElementRef[] = [];

  // constructor(private el: ElementRef, private renderer: Renderer2) {}

  // ngAfterViewInit(): void {
  //   // Initialize IntersectionObserver
  //   this.observer = new IntersectionObserver((entries) => {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting) {
  //         const elementId = entry.target.id;
  //         this.startCounting(elementId);
  //         this.observer.unobserve(entry.target); // Stop observing once the animation starts
  //       }
  //     });
  //   });

  //   // Observe each element you want to animate
  //   const elements = this.el.nativeElement.querySelectorAll('.count-up');
  //   elements.forEach(element => {
  //     this.observer.observe(element);
  //     this.observedElements.push(element);
  //   });
  // }

  // startCounting(elementId: string): void {
  //   switch (elementId) {
  //     case 'clients':
  //       this.incrementCount('clients', 1500, 10);
  //       break;
  //     case 'years_of_experience':
  //       this.incrementCount('years_of_experience', 26, 10);
  //       break;
  //     case 'industries':
  //       this.incrementCount('industries', 22, 10);
  //       break;
  //     case 'branches':
  //       this.incrementCount('branches', 4, 10);
  //       break;
  //     default:
  //       break;
  //   }
  // }

  // incrementCount(variable: string, limit: number, speed: number): void {
  //   const interval = setInterval(() => {
  //     this[variable]++;
  //     if (this[variable] >= limit) {
  //       clearInterval(interval);
  //     }
  //   }, speed);
  // }

  // ngOnDestroy(): void {
  //   // Cleanup observer when component is destroyed
  //   if (this.observer) {
  //     this.observer.disconnect();
  //   }
  // }
}
