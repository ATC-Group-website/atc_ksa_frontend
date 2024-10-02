import { Component } from '@angular/core';
import { PostsService } from '../posts.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { NavComponent } from '../nav/nav.component';
import { PostsCountResponse } from '../dashboard';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoadingSpinnerComponent, NavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isLoading: boolean = true;
  postsCount!: PostsCountResponse;
  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.postsService.getPostsCount().subscribe((res) => {
      this.postsCount = res;
      this.isLoading = false;
    });
  }
}
