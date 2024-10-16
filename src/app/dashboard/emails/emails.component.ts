import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { PostsService } from '../posts.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-emails',
  standalone: true,
  imports: [NavComponent, LoadingSpinnerComponent, RouterModule],
  templateUrl: './emails.component.html',
  styleUrl: './emails.component.css',
})
export class EmailsComponent implements OnInit {
  isLoading: boolean = true;
  subscribers: any[] = [];
  showDeleteModal = false;
  emailIdToDelete: number | null = null;
  emailToDelete: string | null = null;

  constructor(
    private emailsService: PostsService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.fetchEmails();
  }

  fetchEmails() {
    this.isLoading = true;
    this.emailsService.getEmails().subscribe({
      next: (response) => {
        this.subscribers = response.subscribers.reverse();
        this.isLoading = false;
        console.log(response);
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  openDeleteModal(subscriberEmail: string, subscriberId: number): void {
    this.emailToDelete = subscriberEmail;
    this.emailIdToDelete = subscriberId;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.emailIdToDelete !== null && this.emailToDelete !== null) {
      const email = {
        email: this.emailToDelete,
      };
      this.emailsService.removeEmail(email).subscribe({
        next: (response) => {
          this.toastr.success(
            `Email id ${this.emailIdToDelete} deleted successfully`,
          );
          this.fetchEmails();

          this.showDeleteModal = false;
        },
        error: (err) => {
          this.toastr.error(`Error`);
        },
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.emailIdToDelete = null;
    this.emailToDelete = null;
  }
}
