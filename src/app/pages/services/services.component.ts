import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { TabComponent } from './tab/tab.component';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterModule,
    TabComponent,
    TabsContainerComponent,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent implements OnInit {
  constructor(
    private titleService: Title,
    private metaService: Meta,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Services | ATC Sobol Al-Khebra');

    this.metaService.updateTag({
      name: 'description',
      content:
        'ATC Provides world-class integrated financial services in Saudi Arabia. ATC Specialized in providing world-class Taxation, Zakat, Auditing and Consultation services.',
    });

    this.metaService.updateTag({
      name: 'keywords',
      content:
        'atc ksa, atc sobol al-khebra, ksa ashraf abdel ghani, tax ksa , zakat ksa, zakat, audit ksa, audit, خدمات سبل الخبرة ,سبل الخبرة , Zakat and Tax Services, Financial Services, Transfer Pricing, Electronic Invoicing, Bookkeeping, Feasibility Study',
    });
  }
}
