import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NgOptimizedImage } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgOptimizedImage],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent implements OnInit {
  constructor(
    private titleService: Title,
    private metaService: Meta,
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('About Us | ATC Sobol Al-Khebra');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Learn more about ATC Sobol Al-Khebra, a premier firm in the Kingdom of Saudi Arabia, specializing in Accounting, Tax, Zakat, and Financial Consulting Services. Our commitment is to provide tailored solutions that meet the unique needs of businesses and individuals.',
    });

    this.metaService.updateTag({
      name: 'keywords',
      content:
        'atc ksa, about atc ksa, about atc sobol al-khebra, atc sobol al-khebra, about us, accounting ksa, tax ksa, zakat ksa, audit ksa, financial consulting, سبل الخبرة',
    });
  }
}
