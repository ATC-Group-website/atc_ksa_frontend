import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.css',
})
export class InsightsComponent implements OnInit {
  currentPage: number = 1;
  totalPages: number = 10;

  ngOnInit(): void {
    this.goToPage(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      // Fetch the data for the new page here by calling your API
      this.fetchData(page);
    }
  }

  fetchData(page: number): void {
    // this.apiService.getData(page).subscribe(response => {...});
    console.log(`Fetching data for page: ${page}`);
  }
}
