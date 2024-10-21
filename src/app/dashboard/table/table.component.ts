import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TruncateDescriptionPipe } from '../truncate-description.pipe';
import { PostsService } from '../posts.service';
import { CustomDatePipe } from '../custom-date.pipe';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../dashboard';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    TruncateDescriptionPipe,
    CustomDatePipe,
    CommonModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  @Input() tableData: Post[] = [];
  @Output() postDeleted = new EventEmitter<void>();

  constructor(
    private postsService: PostsService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {}

  isArabic(text: string): boolean {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text);
  }

  onEditPost(id: number) {
    this.router.navigate([`dashboard/edit-post/${id}`]);
  }

  showDeleteModal = false;
  postIdToDelete: number | null = null;

  onDeletePost(id: number): void {
    this.postIdToDelete = id;
    this.showDeleteModal = true;
  }

  // When a post is deleted, emit an event to notify the parent component
  confirmDelete(): void {
    if (this.postIdToDelete !== null) {
      this.postsService.deletePost(this.postIdToDelete).subscribe({
        next: (response) => {
          this.toastr.success(
            `Post ${this.postIdToDelete} deleted successfully`,
          );
          this.postDeleted.emit(); // Emit the event to the parent
          this.showDeleteModal = false; // Close modal after deletion
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  cancelDelete(): void {
    // Close the modal without deleting
    this.showDeleteModal = false;
    this.postIdToDelete = null;
  }
}
