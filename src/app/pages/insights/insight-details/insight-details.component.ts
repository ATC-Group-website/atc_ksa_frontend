import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";

@Component({
  selector: 'app-insight-details',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './insight-details.component.html',
  styleUrl: './insight-details.component.css',
})
export class InsightDetailsComponent implements OnInit {
  article!: any;
  isLoading: boolean = true;

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe((params) => {
    //   const id = parseInt(params['id'], 10);
    //   if (isNaN(id)) {
    //     this.isLoading = false;
    //     return;
    //   }
    //   this.articlesService.getPostDetails(id).subscribe({
    //     next: (res) => {
    //       this.article = res.data;
    //       this.isLoading = false;
    //     },
    //     error: (error) => {
    //       this.isLoading = false;
    //     },
    //   });
    // });
  }
}
