import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  NewPost,
  PaginatedResponse,
  PostCreationResponse,
  PostDeletedResponse,
  PostsCountResponse,
} from './dashboard';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  authToken: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor(private http: HttpClient) {
    if (
      typeof window !== 'undefined' &&
      typeof sessionStorage !== 'undefined'
    ) {
      const storedToken = sessionStorage.getItem('token');
      if (storedToken !== null) {
        this.authToken.next(storedToken);
      }
    }
  }

  private getRequestOptions(authToken: string): { headers: HttpHeaders } {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    return { headers: headers };
  }

  addPost(formData: NewPost): Observable<PostCreationResponse> {
    const authToken = this.authToken.getValue(); // Retrieve the token value
    if (!authToken) {
      throw new Error('No auth token found');
    }

    const requestOptions = this.getRequestOptions(authToken);
    return this.http.post<PostCreationResponse>(
      `https://api.atcprotraining.com/blogs`,
      formData,
      requestOptions,
    );
  }

  getSinglePost(id: number): Observable<any> {
    return this.http.get<any>(`https://api.atcprotraining.com/blogs/${id}`);
  }

  updatePost(id: number, formData: any): Observable<any> {
    const authToken = this.authToken.getValue(); // Retrieve the token value
    if (!authToken) {
      throw new Error('No auth token found');
    }

    const requestOptions = this.getRequestOptions(authToken);
    return this.http.put<any>(
      `https://api.atcprotraining.com/blogs/${id}`,
      formData,
      requestOptions,
    );
  }

  deletePost(id: number): Observable<PostDeletedResponse> {
    const authToken = this.authToken.getValue(); // Retrieve the token value
    if (!authToken) {
      throw new Error('No auth token found');
    }

    const requestOptions = this.getRequestOptions(authToken);
    return this.http.delete<PostDeletedResponse>(
      `https://api.atcprotraining.com/blogs/${id}`,
      requestOptions,
    );
  }

  // get blogs count in dashboard
  getPostsCount(): Observable<PostsCountResponse> {
    return this.http.get<PostsCountResponse>(
      `https://api.atcprotraining.com/blogsCount`,
    );
  }

  // get news letter subscribers count in dashboard
  getSubscibersCount(): Observable<any> {
    return this.http.get<any>('https://api.atcprotraining.com/news/count');
  }

  subscribeNewsLetter(formData: any): Observable<any> {
    return this.http.post<any>(
      'https://api.atcprotraining.com/news/subscribe',
      formData,
    );
  }

  // get paginated articles 10 per page in articles dashboard table
  getArticles(): Observable<PaginatedResponse> {
    return this.http.get<PaginatedResponse>(
      'https://api.atcprotraining.com/blogs/paginate/10/1',
    );
  }

  // get paginated news 10 per page in blogs dashboard table
  getNews(): Observable<PaginatedResponse> {
    return this.http.get<PaginatedResponse>(
      'https://api.atcprotraining.com/blogs/paginate/10/2',
    );
  }

  // get paginated blogs 10 per page in blogs dashboard table
  getBlogs(): Observable<PaginatedResponse> {
    return this.http.get<PaginatedResponse>(
      'https://api.atcprotraining.com/blogs/paginate/10/3',
    );
  }

  // get all subscribers emails
  getEmails(): Observable<any> {
    return this.http.get<any>('https://api.atcprotraining.com/news');
  }

  // delete email
  removeEmail(email: any): Observable<any> {
    return this.http.post<any>(
      'https://api.atcprotraining.com/news/unsubscribe',
      email,
    );
  }

  // send email to news letter subscribers
  sendEmail(pdf: object): Observable<any> {
    return this.http.post<any>('https://api.atcprotraining.com/news/send', pdf);
  }

  changePostImage(id: number, imageData: object): Observable<any> {
    const authToken = this.authToken.getValue(); // Retrieve the token value
    if (!authToken) {
      throw new Error('No auth token found');
    }

    const requestOptions = this.getRequestOptions(authToken);

    return this.http.post<any>(
      `https://api.atcprotraining.com/images/blog/${id}`,
      imageData,
      requestOptions,
    );
  }

  removeSingleImage(id: number): Observable<any> {
    const authToken = this.authToken.getValue();

    if (!authToken) {
      throw new Error('No auth token found');
    }

    const requestOptions = this.getRequestOptions(authToken);

    return this.http.delete<any>(
      `https://api.atcprotraining.com/images/${id}`,
      requestOptions,
    );
  }
}
