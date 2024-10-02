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

  // might delete later
  // getPosts(): Observable<any> {
  //   return this.http.get<any>('https://api.atcprotraining.com/blogs');
  // }

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

  getArticlesInsights(pageNum: number): Observable<any> {
    return this.http.get<any>(
      `https://api.atcprotraining.com/blogs/paginate/3/1?page=${pageNum}`,
    );
  }

  getNewsInsights(pageNum: number): Observable<any> {
    return this.http.get<any>(
      `https://api.atcprotraining.com/blogs/paginate/3/3?page=${pageNum}`,
    );
  }

  getBlogsInsights(pageNum: number): Observable<any> {
    return this.http.get<any>(
      `https://api.atcprotraining.com/blogs/paginate/3/4?page=${pageNum}`,
    );
  }

  // get blogs count in dashboard
  getPostsCount(): Observable<PostsCountResponse> {
    return this.http.get<PostsCountResponse>(
      `https://api.atcprotraining.com/blogsCount`,
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

  // delete later
  getSingleImage(): Observable<any> {
    return this.http.get('https://api.atcprotraining.com/images/15');
  }
}
